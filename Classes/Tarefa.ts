import { randomUUID } from "crypto";

class Tarefa {
    readonly id: string;
    titulo: string;
    descricao: string;
    responsavel: string;
    concluida: boolean;
    readonly dataCriacao: Date;

    constructor(tituloP: string, descricaoP: string, responsavelP: string){
        this.id = randomUUID().substring(0, 5)
        this.concluida = false
        this.dataCriacao = new Date()
        this.titulo = tituloP
        this.responsavel = responsavelP
        this.descricao = descricaoP
    }
}

export default Tarefa;