// const ApiService = require('../services/ApiService');


function trataImagem(path){
    if(path){
        return `${process.env.BASE}/assets/images/${ds_path}`;
    }
    return `${process.env.BASE}/assets/images/semimagem.svg`;
}

function trataData(data){
    const dt = new Date(data);
    let d = dt.getDate();
    let m = dt.getMonth() + 1;
    let y = dt.getFullYear();
    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    let dateTemp = `${d}/${m}/${y}`;
    return dateTemp;
}


module.exports = {
    ping: (req, res) => {
        res.json({ pong: true });
    },


    // proventos: async (req, res) => {
    //     let json = { error: '', result: [] };
    //     let proventos = await ApiService.getProventos();
    //     for (let i in proventos) {
    //         let tipo_provento_temp = proventos[i].in_tipo_provento == 'D' ? 'Dividendos' : 'JCP';
    //         let ativo = await ApiService.findAtivoById(proventos[i].cd_ativo);
    //         let img_temp = trataImagem(ativo.ds_path);


    //         json.result.push({
    //             id: proventos[i].id_provento,
    //             tipo_provento: tipo_provento_temp,
    //             data_com: trataData(proventos[i].dt_com),
    //             data_pag: trataData(proventos[i].dt_pagamento),
    //             valor: proventos[i].nr_valor,
    //             ativo: {
    //                 id: ativo.id_ativo,
    //                 tag: ativo.ds_ativo,
    //                 descricao: ativo.ds_descricao,
    //                 img: img_temp
    //             }

    //         });
    //     }

    //     res.json(json);
    // },

    // proventosFiltro: async (req, res) => {
    //     let json = { error: '', result: [] };


    //     res.json(json);

    // },

    // umProvento: async (req, res) => {
    //     let json = { error: '', result: [] };
    //     let id = req.params.id;
    //     let provento = await ApiService.findProventoById(id);
    //     let ativo = await ApiService.findAtivoById(provento.cd_ativo);

    //     if (provento) {
    //         json.result.push({
    //             id: provento.id_provento,
    //             tipo_provento: provento.in_tipo_provento == 'D' ? 'Dividendos' : 'JCP',
    //             data_com: trataData(provento.dt_com),
    //             data_pag: trataData(provento.dt_pagamento),
    //             valor: provento.nr_valor,
    //             ativo: {
    //                 id: ativo.id_ativo,
    //                 tag: ativo.ds_ativo,
    //                 descricao: ativo.ds_descricao,
    //                 img: `${process.env.BASE}/assets/images/${ativo.ds_path}`
    //             }
    //         });
    //     }


    //     res.json(json);

    // },


    // umAtivo: async (req, res) => {
    //     let json = { error: '', result: [] };
    //     let id = req.params.id;
    //     let ativo = await ApiService.findAtivoById(id);
    //     if (ativo) {

    //         let img_temp = trataImagem(ativo.ds_path);
    //         json.result.push({
    //             ativo: {
    //                 id: ativo.id_ativo,
    //                 tag: ativo.ds_ativo,
    //                 descricao: ativo.ds_descricao,
    //                 img: img_temp 
    //             }
    //         });
    //     }
    //     res.json(json);
    // }

}