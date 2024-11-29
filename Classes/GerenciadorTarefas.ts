import Tarefa from "./Tarefa";
import PromptSync from "prompt-sync";

const prompt = PromptSync()

abstract class GerenciadorTarefas {
    static listaTarefas: Tarefa[] = [];

    static menu(){
        console.log("============ Gerenciador de Tarefas =========== ");
        console.log("[1]  - Adicionar nova tarefa")
        console.log("[2]  - listar todas as tarefas")
        console.log("[3]  - marcar tarefa concluída")
        console.log("[4]  - Sair")
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
                    this.listarTarefas()
                    break;
                case 3:
                    let id = prompt("Digite o id da tarefa: ")
                    this.marcarComoConcluida(id)
                    break
                case 4:
                    process.exit(0);
                    break;
            }
        } 
    }

    static listarTarefas(): void {
        console.log("======== Lista de tarefas =========")
        this.listaTarefas.map(tarefa => {
            console.log("-------------")
            console.log(`ID: ${tarefa.id} - Descrição: ${tarefa.descricao}\nResponsável: ${tarefa.responsavel} \ncriado em: ${tarefa.dataCriacao.toLocaleString()} - Status: ${tarefa.concluida ? 'concluída' : 'pendente'}`)
            console.log("-------------")
        })
    }

    static adicionarTarefa(tarefa: Tarefa): void {
        this.listaTarefas.push(tarefa)
    }

    static marcarComoConcluida(id: string){
        let exists = false

        this.listaTarefas.forEach(tarefa => {
            if(tarefa.id == id){
                tarefa.concluida = true
                exists = true
                return
            }
        })

        if(!exists){
            console.log("Não foi encontrado tarefa com o id informado!")
        }
    }
}

export default GerenciadorTarefas