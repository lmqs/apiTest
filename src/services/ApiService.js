const db = require('../db');

module.exports = {

    /**criar diversas funções no banco de dados */

    getProventos: () => {
        return new Promise((resolve, reject) => {

            db.query(' SELECT * FROM provento limit 20', (error, results) => {
                if (error) { reject(error); return }
                resolve(results);
            });

        });
    },

    findProventoById: (id) => {
        return new Promise((resolve, reject) => {

            db.query('SELECT * FROM provento where id_provento = ?', [id], (error, results) => {
                if (error) { reject(error); return }
                // resolve(results);
                if(results.length >0){
                    resolve(results[0]);
                }else{
                    resolve(false);
                }
            });
        });
    },



    findAtivoById: (id) => {
        return new Promise((resolve, reject) => {

            db.query('SELECT * FROM ativo where id_ativo = ?', [id], (error, results) => {
                if (error) { reject(error); return }
                if(results.length >0){
                    resolve(results[0]);
                }else{
                    resolve(false);
                }
            });
        });
    }


}

