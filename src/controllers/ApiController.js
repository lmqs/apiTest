const ApiService = require('../services/ApiService');


function trataImagem(path) {
    if (path) {
        return `https://apidividendos.herokuapp.com/api/assets/images/${path}`;
    }
    return `https://apidividendos.herokuapp.com/api/assets/images/semimagem.svg`;
}
function trataImagemIPO(path) {
    if (path) {
        return `https://apicronservice.herokuapp.com/api_service/${path}`;
    }
    return `https://apidividendos.herokuapp.com/api/assets/images/semimagem.svg`;
}

function trataData(data) {
    if (!data) {
        return '-';
    }
    const dt = new Date(data);
    let d = dt.getDate();
    let m = dt.getMonth() + 1;
    let y = dt.getFullYear();
    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    let dateTemp = `${d}/${m}/${y}`;
    return dateTemp;
}

function trataVazio(data) {
    if (!data) {
        return '-';
    }
    return data;
}


function trataStatusIPO(status) {
    if (status == 'E') {
        return 'Em andamento';
    } else if (status == 'F') {
        return 'Finalizado';
    } else if (status == 'C') {
        return 'Cancelado';
    } else {
        return 'Aberto';
    }
}

//objetos literais
function trataTipo($tipo) {
    const tipo_ = {
        A: 'Ação',
        F: 'FII',
        B: 'BDR',
        default: 'Tipo não encontrado'
    }
    return tipo_[$tipo] || tipo_.default;
}


function trataTipoGeral($tipo) {
    const tipo_ = {
        J: 'JCP',
        D: 'Dividendo',
        C: 'Comunicado',
        default: 'Índice não encontrado'
    }
    return tipo_[$tipo] || tipo_.default;
}


function trataIndice($tipo) {
    const tipo_ = {
        A: 'IBovespa',
        F: 'IFix',
        B: 'Bdrx',
        default: 'Índice não encontrado'
    }
    return tipo_[$tipo] || tipo_.default;
}
function trataDescricao($tipo) {
    const tipo_ = {
        A: 'Bovespa e BMF',
        F: 'Fundo de investimento imobiliário',
        B: 'Brazilian Depositary Receipts',
        default: 'Descrição não encontrado'
    }
    return tipo_[$tipo] || tipo_.default;
}

function trataSinal($sinal) {
    if ($sinal == 'D') {
        return `https://apidividendos.herokuapp.com/assets/images/down.svg`;
    }
    return `https://apidividendos.herokuapp.com/assets/images/up.svg`;
}


module.exports = {
    ping: (req, res) => {
        res.json({ pong: true });
    },


    indicesAtual: async (req, res) => {
        let json = { error: '', result: [] };
        let grafico = 'grafico.svg';
        let indices = await ApiService.getIndicesAtual();
        for (let i in indices) {
            json.result.push({
                id: indices[i].id_indice,
                tipo: trataTipo(indices[i].ds_tipo),
                indice: trataIndice(indices[i].ds_tipo),
                descricao: trataDescricao(indices[i].ds_tipo),
                dt: trataData(indices[i].dt),
                pontuacao: indices[i].nr_pontuacao,
                valorizacao: indices[i].nr_valorizacao,
                sinal: trataSinal(indices[i].in_var_des),
                grafico: trataImagem(grafico),

            });
        }

        res.json(json);
    },
    geral: async (req, res) => {
        let json = { error: '', result: [] };
        let ativos = await ApiService.getGeral();
        for (let i in ativos) {
            let tipo_provento_temp = ativos[i].in_tipo_provento == 'D' ? 'Dividendos' : 'JCP';

            json.result.push({
                descricao_anuncio: ativos[i].descricao_ativo,
                data_anuncio: trataData(ativos[i].dt_com),

                id: ativos[i].id_provento,
                tipo_provento: tipo_provento_temp,
                data_com: trataData(ativos[i].dt_com),
                data_pag: trataData(ativos[i].dt_pagamento),
                valor: ativos[i].nr_valor,
                card: ativos[i].in_tipo,


                ativo: {
                    id: ativos[i].id_ativo,
                    tag: ativos[i].ds_ativo,
                    descricao: ativos[i].ds_descricao,
                    img: trataImagem(ativos[i].ds_path)
                }

            });
        }
        res.json(json);
    },

    verTodos: async (req, res) => {
        let json = { error: '', qtd_registro: 0, result: [] };
        let itensPagina = req.params.itensPagina;
        let page = req.params.page;

        let ativos = await ApiService.getVerTodos(itensPagina, page);
        let totalRegistros = await ApiService.getVerTodosQtd();
        json.qtd_registro = totalRegistros.qtd_registro;

        for (let i in ativos) {
            let tipo_provento_temp = ativos[i].in_tipo_provento == 'D' ? 'Dividendos' : 'JCP';

            json.result.push({
                descricao_anuncio: ativos[i].descricao_ativo,
                data_anuncio: trataData(ativos[i].dt_com),

                id_provento: ativos[i].id_provento,
                id_relatorio: ativos[i].id_relatorio,
                tipo_provento: tipo_provento_temp,
                data_com: trataData(ativos[i].dt_com),
                data_pag: trataData(ativos[i].dt_pagamento),
                valor: ativos[i].nr_valor,
                card: ativos[i].in_tipo,




                ativo: {
                    id: ativos[i].id_ativo,
                    tag: ativos[i].ds_ativo,
                    descricao: ativos[i].ds_descricao,
                    img: trataImagem(ativos[i].ds_path)
                }

            });
        }
        res.json(json);
    },


    proventos: async (req, res) => {
        let json = { error: '', qtd_registro: 0, result: [] };
        let tipo = req.params.tipo;
        let itensPagina = req.params.itensPagina;
        let page = req.params.page;

        let proventos = await ApiService.getProventos(tipo, itensPagina, page);
        let totalRegistros = await ApiService.getProventosTotal(tipo);
        json.qtd_registro = totalRegistros.qtd_registro;

        for (let i in proventos) {
            let tipo_provento_temp = proventos[i].in_tipo_provento == 'D' ? 'Dividendos' : 'JCP';
            let ativo = await ApiService.findAtivoById(proventos[i].cd_ativo);
            let img_temp = trataImagem(ativo.ds_path);


            json.result.push({
                id: proventos[i].id_provento,
                tipo_provento: tipo_provento_temp,
                data_com: trataData(proventos[i].dt_com),
                data_pag: trataData(proventos[i].dt_pagamento),
                valor: proventos[i].nr_valor,
                ativo: {
                    id: ativo.id_ativo,
                    tag: ativo.ds_ativo,
                    descricao: ativo.ds_descricao,
                    img: img_temp
                }

            });
        }


        res.json(json);
    },


    relatorios: async (req, res) => {
        let json = { error: '', qtd_registro: 0, result: [] };
        let tipo = req.params.tipo;
        let itensPagina = req.params.itensPagina;
        let page = req.params.page;

        let relatorios = await ApiService.getRelatorios(tipo, itensPagina, page);
        let totalRegistros = await ApiService.getRelatoriosTotal(tipo);
        json.qtd_registro = totalRegistros.qtd_registro;

        for (let i in relatorios) {

            let img_temp = trataImagem(relatorios[i].ds_path);
            json.result.push({
                id: relatorios[i].id_relatorio,
                data_anuncio: trataData(relatorios[i].dt_anuncio),
                descricao_anuncio: relatorios[i].ds_descricao_anuncio,
                ativo: {
                    id: relatorios[i].id_ativo,
                    tag: relatorios[i].ds_ativo,
                    descricao: relatorios[i].ds_descricao,
                    img: img_temp
                }

            });
        }

        res.json(json);
    },

    IPOs: async (req, res) => {
        let json = { error: '', qtd_registro: 0, result: [] };
        let tipo = req.params.tipo;
        let itensPagina = req.params.itensPagina;
        let page = req.params.page;

        let ipos = await ApiService.getIPOs(tipo, itensPagina, page);

        let totalRegistros = await ApiService.getIPOsTotal(tipo);
        json.qtd_registro = totalRegistros.qtd_registro;

        for (let i in ipos) {
            let img_temp = trataImagemIPO(ipos[i].ds_path);
            json.result.push({
                id: ipos[i].id_ipo,
                tag: trataVazio(ipos[i].ds_ativo),
                descricao: ipos[i].ds_descricao,
                img: img_temp,
                dt_inicio: trataData(ipos[i].dt_inicio),
                valor: trataVazio(ipos[i].nr_valor_inicio),
                status: trataStatusIPO(ipos[i].in_status)
            });
        }
        res.json(json);
    },


    proventosFiltro: async (req, res) => {
        let json = { error: '', result: [] };


        res.json(json);

    },

    umProvento: async (req, res) => {
        let json = { error: '', result: [] };
        let id = req.params.id;
        let provento = await ApiService.findProventoById(id);
        let ativo = await ApiService.findAtivoById(provento.cd_ativo);

        if (provento) {
            json.result.push({
                id: provento.id_provento,
                tipo_provento: provento.in_tipo_provento == 'D' ? 'Dividendos' : 'JCP',
                data_com: trataData(provento.dt_com),
                data_pag: trataData(provento.dt_pagamento),
                valor: provento.nr_valor,
                ativo: {
                    id: ativo.id_ativo,
                    tag: ativo.ds_ativo,
                    descricao: ativo.ds_descricao,
                    img: `${process.env.BASE}/assets/images/${ativo.ds_path}`
                }
            });
        }


        res.json(json);

    },


    umAtivo: async (req, res) => {
        let json = { error: '', result: [] };
        let id = req.params.id;
        let ativo = await ApiService.findAtivoById(id);
        if (ativo) {

            let img_temp = trataImagem(ativo.ds_path);
            json.result.push({
                ativo: {
                    id: ativo.id_ativo,
                    tag: ativo.ds_ativo,
                    descricao: ativo.ds_descricao,
                    img: img_temp
                }
            });
        }
        res.json(json);
    }


}