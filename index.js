const { select, input, checkbox } = require('@inquirer/prompts');

let meta = {
    value: "beber 3L água por dia",
    checked: false
};
let metas = [meta];

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite sua meta" });

    if (meta.length == 0) {
        console.log("A meta não pode ser vazia.");
        return;
    }

    metas.push(
        { value: meta, checked: false }
    );
};

const listarMetas = async () => {
    const resposta = await checkbox({
        message: "Use as setas para mudar meta, o espaço para marcar e desmarcar, e o enter para finalizar!",
        choices: [...metas],
        instructions: false
    });

    metas.forEach((m) => {
        m.checked = false;
    });

    if (resposta.length == 0) {
        console.log("Nenhuma meta selecionada!");
        return;
    }

    resposta.forEach((res) => {
        const meta = metas.find((m) => m.value === res);
        if (meta) {
            meta.checked = true;
        }
    });
    console.log('Metas concluídas');
};

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => meta.checked);
    if (realizadas.length == 0) {
        console.log('Não existem metas realizadas ainda!');
        return;
    }

    await select({
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    });
};

const deletarMetas = async () => {
    const itemsADeletar = await checkbox({
        message: "Selecione uma meta para deletar",
        choices: metas.map((meta) => ({ name: meta.value, value: meta.value })),
        instructions: false
    });

    if (itemsADeletar.length == 0) {
        console.log("Nenhuma meta selecionada!");
        return;
    }

    metas = metas.filter((meta) => !itemsADeletar.includes(meta.value));
    console.log("Metas deletadas com sucesso!");
};

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => !meta.checked);

    if (abertas.length == 0) {
        console.log('Não existem metas abertas');
        return;
    }

    await select({
        message: "Metas abertas: " + abertas.length,
        choices: [...abertas]
    });
};

const start = async () => {
    while (true) {
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar metas",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizar"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        });

        switch (opcao) {
            case "cadastrar":
                await cadastrarMeta();
                console.log(metas);
                break;
            case "listar":
                await listarMetas();
                break;
            case "realizar":
                await metasRealizadas();
                break;
            case "abertas":
                await metasAbertas();
                break;
            case "deletar":
                await deletarMetas();
                break;
            case "sair":
                console.log("Até a próxima");
                return;
        }
    }
};

start();
