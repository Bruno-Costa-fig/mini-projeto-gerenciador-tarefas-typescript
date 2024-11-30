import Tarefa from "./Tarefa";
import PromptSync from "prompt-sync";
import jsPDF from 'jspdf';
import { randomUUID } from "crypto";

const prompt = PromptSync()

abstract class GerenciadorTarefas {
    static listaTarefas: Tarefa[] = [];

    static menu(){
        console.log("============ Gerenciador de Tarefas =========== ");
        console.log("[1]  - Adicionar nova tarefa")
        console.log("[2]  - listar todas as tarefas")
        console.log("[3]  - alterar status tarefa")
        console.log("[4]  - listar por responsável")
        console.log("[5]  - listar por status")
        console.log("[6]  - Gerar relatório PDF")
        console.log("[7]  - Sair")
    }

    static main(): void {

        while (true) {
            this.menu()
            let escolha = Number(prompt("Escolha uma opção: "))

            switch(escolha){
                case 1:
                    let titulo = prompt("Digite o título da tarefa: ")
                    let descricao = prompt("Digite a descrição da tarefa: ")
                    let responsavel = prompt("Digite o responsável pela tarefa: ")
                    let newTarefa = new Tarefa(titulo, descricao, responsavel)
                    this.adicionarTarefa(newTarefa)
                    break;
                case 2:
                    this.listarTarefas(this.listaTarefas)
                    break;
                case 3:
                    let id = prompt("Digite o id da tarefa: ")
                    this.marcarComoConcluida(id)
                    break
                case 4:
                    let nomeResponsavel = prompt("Digite o nome do responsável: ")

                    let listaFiltrada = this.filtrarPorResponsavel(nomeResponsavel);
                    this.listarTarefas(listaFiltrada)
                case 5:
                    let status = Number(prompt("Escolha qual o status - [1] concluída | [2] pendente: "))

                    if(status != 1 && status != 2){
                        console.log("Opção inválida!")
                        break
                    }

                    let listaFiltradaStatus = this.filtrarPorStatus(status == 1 ? true : false);

                    this.listarTarefas(listaFiltradaStatus)
                    break
                case 6:
                    this.gerarRelatorioPDF()
                    break
                case 7:
                    process.exit(0);
                    break;
            }
        } 
    }

    static listarTarefas(listagemTarefas: Tarefa[]): void {
        console.log("======== Lista de tarefas =========")
        listagemTarefas.map(tarefa => {
            console.log(`
                ID: ${tarefa.id} 
                Título: ${tarefa.titulo}
                Descrição: ${tarefa.descricao}
                Responsável: ${tarefa.responsavel} 
                criado em: ${tarefa.dataCriacao.toLocaleString()}
                Status: ${tarefa.concluida ? 'concluída' : 'pendente'}
            `)
        })
    }

    static adicionarTarefa(tarefa: Tarefa): void {
        this.listaTarefas.push(tarefa)
    }

    static marcarComoConcluida(id: string){
        let exists = false

        this.listaTarefas.forEach(tarefa => {
            if(tarefa.id == id){
                tarefa.concluida = !tarefa.concluida
                exists = true
                return
            }
        })

        if(!exists){
            console.log("Não foi encontrado tarefa com o id informado!")
        }
    }

    static filtrarPorResponsavel(nome: string): Tarefa[] {
        return this.listaTarefas.filter((tarefaAtual) => {
            if(tarefaAtual.responsavel === nome){
                return true
            }

            return false
        })
    }

    static filtrarPorStatus(concluida: boolean): Tarefa[] {
        return this.listaTarefas.filter((tarefaAtual) => {
            if(tarefaAtual.concluida == concluida){
                return true
            }

            return false
        })
    }

    static gerarRelatorioPDF(){
        const doc = new jsPDF()

        doc.text("Relatório de tarefas:", 20, 20)

        this.listaTarefas.map((tarefa, index) => {
            doc.text(`ID: ${tarefa.id} - Descrição: ${tarefa.descricao}\nResponsável: ${tarefa.responsavel} \ncriado em: ${tarefa.dataCriacao.toLocaleString()} - Status: ${tarefa.concluida ? 'concluída' : 'pendente'}`, 20, (30 + (30 * index + 1)))
        })

        doc.save(`relatorio_tarefas-${randomUUID().substring(0,4)}.pdf`);
    }
}

export default GerenciadorTarefas