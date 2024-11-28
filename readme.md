# Mini Projeto: Sistema de Gestão de Tarefas

## Descrição do Projeto

Você vai desenvolver um sistema simples para gerenciar tarefas de um time, utilizando classes, interfaces e funções. O sistema permitirá criar, listar e marcar tarefas como concluídas, com opções para filtrar tarefas por status e por responsável.

## Requisitos do Sistema

### Modelagem de Tarefas

Cada tarefa possui:
- **id** (string): Identificador único.
- **titulo** (string): Título da tarefa.
- **descricao** (string): Detalhes da tarefa.
- **responsavel** (string): Nome do responsável.
- **concluida** (boolean): Indica se a tarefa está concluída.
- **dataCriacao** (Date): Data de criação da tarefa.

### Estrutura do Projeto

Use uma classe chamada `Tarefa` para definir uma tarefa.

Crie uma classe chamada `GerenciadorDeTarefas` com os seguintes métodos:
- `adicionarTarefa(tarefa: ITarefa): void`: Adiciona uma nova tarefa à lista de tarefas.
- `listarTarefas(): ITarefa[]`: Retorna todas as tarefas.
- `marcarComoConcluida(id: string): void`: Marca uma tarefa como concluída com base no ID.
- `filtrarPorResponsavel(nome: string): ITarefa[]`: Retorna tarefas atribuídas a um responsável.
- `filtrarPorStatus(concluida: boolean): ITarefa[]`: Retorna tarefas pelo status (concluídas ou pendentes).

### Interface do Usuário (console)

Implemente funções que interajam com o usuário no console para:
- Adicionar uma tarefa.
- Listar todas as tarefas.
- Filtrar tarefas por responsável.
- Filtrar tarefas por status.

## Gerando Relatórios PDF com jsPDF

Para gerar relatórios em PDF, você pode utilizar a biblioteca `jsPDF`. Abaixo está um exemplo de como utilizá-la:

```javascript
import jsPDF from 'jspdf';

function gerarRelatorioPDF(tarefas) {
    const doc = new jsPDF();
    doc.text('Relatório de Tarefas', 10, 10);
    
    tarefas.forEach((tarefa, index) => {
        doc.text(`${index + 1}. ${tarefa.titulo} - ${tarefa.responsavel} - ${tarefa.concluida ? 'Concluída' : 'Pendente'}`, 10, 20 + (index * 10));
    });

    doc.save('relatorio_tarefas.pdf');
}
```

Este exemplo cria um documento PDF com uma lista de tarefas e salva o arquivo como `relatorio_tarefas.pdf`.
