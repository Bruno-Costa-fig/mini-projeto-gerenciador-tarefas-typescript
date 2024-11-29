import promptSync from "prompt-sync";
import jsPDF from "jspdf";

const prompt = promptSync();

interface ITarefa {
    id: string;
    titulo: string;
    descricao: string;
    responsavel: string;
    concluida: boolean;
    dataCriacao: Date;
}

class GerenciadorDeTarefas {
    private tarefas: ITarefa[] = [];

    adicionarTarefa(tarefa: ITarefa): void {
        this.tarefas.push(tarefa);
        console.log(`Tarefa "${tarefa.titulo}" adicionada com sucesso!`);
    }

    listarTarefas(): ITarefa[] {
        return this.tarefas;
    }

    marcarComoConcluida(id: string): void {
        const tarefa = this.tarefas.find(t => t.id === id);
        if (tarefa) {
            tarefa.concluida = true;
            console.log(`Tarefa "${tarefa.titulo}" marcada como concluída.`);
        } else {
            console.log("Tarefa não encontrada.");
        }
    }

    filtrarPorResponsavel(nome: string): ITarefa[] {
        return this.tarefas.filter(t => t.responsavel === nome);
    }

    filtrarPorStatus(concluida: boolean): ITarefa[] {
        return this.tarefas.filter(t => t.concluida === concluida);
    }

    gerarRelatorioPDF(): void {
        if (this.tarefas.length === 0) {
            console.log("Nenhuma tarefa disponível para gerar o relatório.");
            return;
        }

        const doc = new jsPDF();
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        doc.text("Relatório de Tarefas", 10, 10);

        let y = 20;
        this.tarefas.forEach((tarefa, index) => {
            const status = tarefa.concluida ? "Concluída" : "Pendente";
            doc.text(
                `${index + 1}. ${tarefa.titulo} - ${status} - Responsável: ${tarefa.responsavel}`,
                10,
                y
            );
            y += 10;

            if (y > 280) {
                doc.addPage();
                y = 10;
            }
        });

        doc.save("relatorio-tarefas.pdf");
        console.log("Relatório gerado: relatorio-tarefas.pdf");
    }


    criarTarefa(): ITarefa {
        const id = (Math.random() * 100000).toFixed(0);
        const titulo = prompt("Digite o título da tarefa:") || "";
        const descricao = prompt("Digite a descrição da tarefa:") || "";
        const responsavel = prompt("Digite o nome do responsável:") || "";
        const dataCriacao = new Date();

        return {
            id,
            titulo,
            descricao,
            responsavel,
            concluida: false,
            dataCriacao,
        };
    }

    exibirTarefas(tarefas: ITarefa[]): void {
        if (tarefas.length === 0) {
            console.log("Nenhuma tarefa encontrada.");
            return;
        }
        tarefas.forEach(t => {
            console.log(
                `${t.id} - ${t.titulo} [${t.concluida ? "Concluída" : "Pendente"}] - Responsável: ${t.responsavel}`
            );
        });
    }

    exibirMenu(): void {
        console.log("\n### Menu ###");
        console.log("1. Adicionar Tarefa");
        console.log("2. Listar Tarefas");
        console.log("3. Marcar Tarefa como Concluída");
        console.log("4. Filtrar por Responsável");
        console.log("5. Filtrar por Status");
        console.log("6. Gerar relatório em PDF");
        console.log("7. Sair");
    }

    iniciar(): void {

        while (true) {
            this.exibirMenu();
            const opcao = prompt('Escolha uma opção: ');

            switch (opcao) {
                case "1":
                    const novaTarefa = this.criarTarefa();
                    this.adicionarTarefa(novaTarefa);
                    break;
                case "2":
                    console.log("Tarefas:");
                    this.exibirTarefas(gerenciador.listarTarefas());
                    break;
                case "3":
                    const idConcluir = prompt("Digite o ID da tarefa a ser concluída:") || "";
                    this.marcarComoConcluida(idConcluir);
                    break;
                case "4":
                    const nomeResponsavel = prompt("Digite o nome do responsável:") || "";
                    this.exibirTarefas(this.filtrarPorResponsavel(nomeResponsavel));
                    break;
                case "5":
                    const status = prompt("Digite o status (concluida/pendente):") || "";
                    this.exibirTarefas(
                        this.filtrarPorStatus(status.toLowerCase() === "concluida")
                    );
                    break;
                case "6":
                    this.gerarRelatorioPDF();
                    break;
                case "7":
                    console.log("Saindo...");
                    process.exit(0);
                default:
                    console.log("Opção inválida.");
            }
        }
    }
}

const gerenciador = new GerenciadorDeTarefas();
gerenciador.iniciar();