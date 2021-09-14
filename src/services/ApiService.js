// const db = require('../db');

module.exports = {

    /**criar diversas funções no banco de dados */

    getProventos: (tipo, itensPagina, page) => {
        const inicio = itensPagina * page;
        const limit = ` LIMIT ${inicio} , ${itensPagina}`;
        return new Promise((resolve, reject) => {

            db.query(` SELECT *, replace(nr_valor, ".",",") as nr_valor FROM proventos p 
                                    inner join ativos a on a.id_ativo = p.cd_ativo 
                        
                        where a.in_tipo_ativo = ?  and dt_com >  DATE_SUB(now(), INTERVAL 5 DAY) order by dt_com  ${limit}`, [tipo], (error, results) => {
                if (error) { reject(error); return }
                resolve(results);
            });

        });
    },
    getProventosTotal: (tipo) => {
        return new Promise((resolve, reject) => {
            db.query(` SELECT count(*) as qtd_registro from proventos p
                        inner join ativos a on a.id_ativo = p.cd_ativo 
                        where a.in_tipo_ativo = ?   and dt_com >  DATE_SUB(now(), INTERVAL 5 DAY)  `, [tipo], (error, results) => {
                if (error) { reject(error); return }

                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(false);
                }
            });

        });
    },


    getGeral: (tipo) => {
        return new Promise((resolve, reject) => {

            db.query(`

            select id_ativo, id_provento, 0 as id_relatorio, ds_ativo, ds_descricao, in_tipo_ativo, ds_path, in_tipo_provento as in_tipo, '' as descricao_ativo, dt_com, dt_pagamento, replace(nr_valor, ".",",") as nr_valor from ativos a
                inner join proventos p on p.cd_ativo = a.id_ativo 
                where dt_com between  DATE_SUB(now(), INTERVAL 5 DAY) AND  DATE_ADD(now(), INTERVAL 30 DAY) 
               
               union
                
            select  id_ativo, 0 as  id_provento, id_relatorio, ds_ativo, a.ds_descricao, in_tipo_ativo, ds_path, 'C' as in_tipo, r.ds_descricao as descricao_relatorio, dt_anuncio, null, 0 as nr_valor  from ativos a
                inner join relatorios r on r.cd_ativo = a.id_ativo
                where dt_anuncio between  DATE_SUB(now(), INTERVAL 5 DAY) AND  DATE_ADD(now(), INTERVAL 30 DAY) 
                
                limit 10
            
                `, (error, results) => {
                if (error) { reject(error); return }
                resolve(results);
            });

        });
    },


    getVerTodos: (itensPagina, page) => {

        const inicio = itensPagina * page;
       
        return new Promise((resolve, reject) => {
            db.query(`
            select * from (
                select id_ativo, id_provento, 0 as id_relatorio, ds_ativo, ds_descricao, in_tipo_ativo, ds_path, in_tipo_provento as in_tipo, '' as descricao_ativo, dt_com, dt_pagamento, replace(nr_valor, ".",",") as nr_valor from ativos a
                    inner join proventos p on p.cd_ativo = a.id_ativo 
                    where dt_com > now() 
                
                union
                    
                select  id_ativo, 0 as  id_provento, id_relatorio, ds_ativo, a.ds_descricao, in_tipo_ativo, ds_path, 'C' as in_tipo, r.ds_descricao as descricao_relatorio, dt_anuncio, null, 0 as nr_valor  from ativos a
                    inner join relatorios r on r.cd_ativo = a.id_ativo
                    where dt_anuncio > now()
            ) a
            order by dt_com  limit ${inicio} , ${itensPagina}
            
                `, (error, results) => {
                if (error) { reject(error); return }
                resolve(results);
            });

        });
    },

    getVerTodosQtd: (tipo) => {
        return new Promise((resolve, reject) => {
            db.query(` 
            select count(*) as qtd_registro from (
                select id_ativo from ativos a
                    inner join proventos p on p.cd_ativo = a.id_ativo 
                    where dt_com > now() 
                
                union
                    
                select  id_ativo  from ativos a
                    inner join relatorios r on r.cd_ativo = a.id_ativo
                    where dt_anuncio > now()
            ) a
                    
            `, [tipo], (error, results) => {
                if (error) { reject(error); return }
                
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(false);
                }
            });

        });
    },


    getIndicesAtual: (tipo) => {
        return new Promise((resolve, reject) => {

            db.query(' select distinct ds_tipo, dt, id_indice, nr_pontuacao, nr_valorizacao, in_var_des from indices group by ds_tipo order by dt DESC limit 3', (error, results) => {
                if (error) { reject(error); return }
                resolve(results);
            });

        });
    },

    getRelatorios: (tipo, itensPagina, page) => {
        const inicio = itensPagina * page;
        const limit = ` LIMIT ${inicio} , ${itensPagina}`;

        return new Promise((resolve, reject) => {

            db.query(` SELECT *, p.ds_descricao as ds_descricao_anuncio FROM relatorios p 
                            inner join ativos a on a.id_ativo = p.cd_ativo 
                                where a.in_tipo_ativo = ? and dt_anuncio > now() order by dt_anuncio ${limit} `, [tipo], (error, results) => {
                if (error) { reject(error); return }
                resolve(results);
            });

        });
    },

    getRelatoriosTotal: (tipo) => {
        return new Promise((resolve, reject) => {
            db.query(` SELECT count(*) as qtd_registro from relatorios r
                        inner join ativos a on a.id_ativo = r.cd_ativo 
                        where a.in_tipo_ativo = ?   and dt_anuncio > now()  `, [tipo], (error, results) => {
                if (error) { reject(error); return }
                
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(false);
                }
            });

        });
    },


    getIPOs: (tipo, itensPagina, page) => {
        const inicio = itensPagina * page;
        const limit = ` LIMIT ${inicio} , ${itensPagina}`;

        return new Promise((resolve, reject) => {
            db.query(` select * from ipos  where in_tipo_ativo = ?   order by in_status ${limit} ` , [tipo], (error, results) => {
                if (error) { reject(error); return }
                resolve(results);
            });

        });
    },

    getIPOsTotal: (tipo) => {
        return new Promise((resolve, reject) => {
            db.query(` SELECT count(*) as qtd_registro from ipos
                        where in_tipo_ativo = ?      `, [tipo], (error, results) => {
                if (error) { reject(error); return }
                
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(false);
                }
            });

        });
    },

    findProventoById: (id) => {
        return new Promise((resolve, reject) => {

            db.query('SELECT * FROM proventos where id_provento = ?', [id], (error, results) => {
                if (error) { reject(error); return }
                // resolve(results);
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(false);
                }
            });
        });
    },



    findAtivoById: (id) => {
        return new Promise((resolve, reject) => {

            db.query('SELECT * FROM ativos where id_ativo = ?', [id], (error, results) => {
                if (error) { reject(error); return }
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(false);
                }
            });
        });
    }


}

