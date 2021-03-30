-- Indicadores
db.indicators.insert(
  {
    code: "04d16a02a2ffc38844f6c55b768ff857",
    title: "Produção Agrícola",
    classifier: "agro",
    description: "A Estimativa e o Realizado para as principais culturas agrícolas do Município de Bom Retiro/MG, realizado pela Secretaria de Agricultura e Abastecimento.",
    source2d: [
      {
        name: "2021-01",
        series: [
          { name: "Estimativa", value: 300 },
          { name: "Realizado", value: 290 }
        ]
      },
      {
        name: "2021-02",
        series: [
          { name: "Estimativa", value: 300 },
          { name: "Realizado", value: 282 }
        ]
      },
      {
        name: "2021-03",
        series: [
          { name: "Estimativa", value: 300 },
          { name: "Realizado", value: 295 }
        ]
      }]
  }
);

db.indicators.insert(
  {
    code: "2994627c5ec6a58947df6825218d3888",
    title: "Percentual de leitos ocupados",
    classifier: "health",
    description: "Apresenta o percentual de ocupação dos leitos para pacientes com COVID no município de Bom Retiro/MG.",
    source1d: [
	{
		"name": "2021-01",
		"value": 92
	},
	{
		"name": "2021-02",
		"value": 94
	},
	,
	{
		"name": "2021-03",
		"value": 97
	}]
  }
);

-- Projetos
db.projects.insert(
  {
    {
      code: "04d16a02a2ffc38844f6c55b768ff857",
      title: "Construção de nova UPA no bairro Canoas",
      department: "SAÚDE",
      description: "Construção de nova unidade de pronto atendimento no bairro Canoas. A sugestão veio a partir da sugestão de morador local, através do portal da prefeitura.",
      status: "ANDAMENTO",
      created: "2020-11-10",
      expiresIn: "2023-01-01",
      author: "Pedro Alves",
      progress: [
        {
          state: "ANÁLISE",
          percentual: 10,
          lock: true,
          nextStates: ["ANDAMENTO"],
          comments: [
            {date: "2020-12-15", text: "Uma comissão irá tratar o assunto.", author: "Ronaldo Góes"},
            {date: "2020-12-05", text: "Projeto entrou em discussão na câmara para debater os detalhes e aprová-lo ou não.", author: "Pedro Nóbre"}
          ]
        },
        {
          state: "ANDAMENTO",
          percentual: 25,
          lock: false,
          nextStates: ["FINALIZADO"],
          comments: [
            {date: "2020-12-30", text: "Projeto aprovado.", author: "João Silva"},
          ]
        }
      ]
    }
  }
);

db.projects.insert(
    {
      code: "2994627c5ec6a58947df6825218d3888",
      title: "Construção de ciclovia na Av. Sarajane (km 12 ao 350)",
      department: "MEIO AMBIENTE",
      description: "Construção de ciclovia que atenda o trecho mais movimentado do município. Isso irá reduzir o fluxo de automóveis no local e, futuramente, criar espaços para áreas de lazer com acesso a ciclovia.",
      status: "ANDAMENTO",
      created: "2020-11-10",
      expiresIn: "2023-01-01",
      author: "Carlos André",
      progress: [
        {
          state: "ANÁLISE",
          percentual: 10,
          lock: true,
          nextStates: ["ANDAMENTO"],
          comments: [
            {date: "2020-12-15", text: "Uma comissão irá tratar o assunto.", author: "Pedro Alves"}
          ]
        },
        {
          state: "ANDAMENTO",
          percentual: 25,
          lock: false,
          nextStates: ["FINALIZADO"],
          comments: [
            {date: "2020-12-05", text: "Projeto não chegou a ser amplamente discutido, internamente, entende-se que é um projeto estratégico para o trânsito da cidade, mas que poderia ser fragmentado em várias entregas (projetos), gerando retorno antecipado a população, além de melhor dimensionamento orçamentário.", author: "Rafael"},
            {date: "2020-12-30", text: "A comissão endossa a decisão. Cancelar este projeto, replanejá-lo e retornar com menor dimensão.", author: "João Silva"}
          ]
        },
        {
          state: "CANCELADO",
          percentual: 25,
          lock: true,
          comments: [
            {date: "2020-12-05", text: "Projeto não chegou a ser amplamente discutido, internamente, entende-se que é um projeto estratégico para o trânsito da cidade, mas que poderia ser fragmentado em várias entregas (projetos), gerando retorno antecipado a população, além de melhor dimensionamento orçamentário.", author: "Rafael"},
            {date: "2020-12-30", text: "A comissão endossa a decisão. Cancelar este projeto, replanejá-lo e retornar com menor dimensão.", author: "João Silva"}
          ]
        }
      ]
    }
);