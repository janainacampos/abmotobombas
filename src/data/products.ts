export type Category = {
  slug: string;
  nome: string;
  descricao: string;
};

export type Product = {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  precoAntigo?: number;
  marca: string;
  descricao: string;
  especificacoes: { label: string; valor: string }[];
  voltagens: string[];
  potencias: string[];
  maisVendido?: boolean;
};

export const categorias: Category[] = [
  {
    slug: "bombas-submersas",
    nome: "Bombas Submersas",
    descricao: "Bombas para poços artesianos, cisternas e drenagem.",
  },
  {
    slug: "bombas-centrifugas",
    nome: "Bombas Centrífugas",
    descricao: "Alta vazão para irrigação, indústria e abastecimento.",
  },
  {
    slug: "motores-eletricos",
    nome: "Motores Elétricos",
    descricao: "Motores monofásicos e trifásicos de alto rendimento.",
  },
  {
    slug: "pressurizadores",
    nome: "Pressurizadores",
    descricao: "Pressão constante para chuveiros, torneiras e caixas d'água.",
  },
  {
    slug: "pecas-reposicao",
    nome: "Peças de Reposição",
    descricao: "Selos, rotores, capacitores, chaves e acessórios.",
  },
];

const spec = (a: string, b: string) => ({ label: a, valor: b });

export const produtos: Product[] = [
  {
    id: "bomba-submersa-1hp",
    nome: "Bomba Submersa 1HP 4 Polegadas",
    categoria: "bombas-submersas",
    preco: 1249.9,
    precoAntigo: 1499.9,
    marca: "AB Force",
    descricao:
      "Bomba submersa de 4 polegadas indicada para poços artesianos profundos. Corpo em aço inox 304, rotores em noryl e motor encapsulado com resfriamento a água.",
    especificacoes: [
      spec("Vazão máxima", "3.600 L/h"),
      spec("Altura manométrica", "72 m"),
      spec("Diâmetro", '4"'),
      spec("Material", "Aço inox 304"),
    ],
    voltagens: ["110V", "220V"],
    potencias: ["1/2 CV", "1 CV", "2 CV"],
    maisVendido: true,
  },
  {
    id: "bomba-submersa-vibratoria",
    nome: "Bomba Submersa Vibratória 370W",
    categoria: "bombas-submersas",
    preco: 389.9,
    marca: "HidroMax",
    descricao:
      "Bomba vibratória compacta para cisternas e poços rasos, com proteção térmica e cabo de 15 metros.",
    especificacoes: [
      spec("Vazão máxima", "1.500 L/h"),
      spec("Altura manométrica", "45 m"),
      spec("Cabo", "15 m"),
    ],
    voltagens: ["110V", "220V"],
    potencias: ["1/2 CV"],
  },
  {
    id: "bomba-submersa-drenagem",
    nome: "Bomba Submersa de Drenagem 1/2 CV",
    categoria: "bombas-submersas",
    preco: 649.9,
    marca: "AB Force",
    descricao:
      "Ideal para drenagem de água limpa ou com sólidos finos, com boia de nível automática.",
    especificacoes: [spec("Vazão máxima", "8.000 L/h"), spec("Boia", "Automática")],
    voltagens: ["110V", "220V"],
    potencias: ["1/2 CV", "1 CV"],
  },
  {
    id: "bomba-centrifuga-monoestagio",
    nome: "Bomba Centrífuga Monoestágio 1 CV",
    categoria: "bombas-centrifugas",
    preco: 899.9,
    precoAntigo: 1049.9,
    marca: "TorqueLine",
    descricao:
      "Bomba centrífuga monoestágio para transferência de água limpa, com corpo em ferro fundido e selo mecânico em cerâmica.",
    especificacoes: [
      spec("Vazão máxima", "12.000 L/h"),
      spec("Recalque", "38 m"),
      spec("Sucção", '1.1/4"'),
    ],
    voltagens: ["110V", "220V"],
    potencias: ["1/2 CV", "1 CV", "2 CV"],
    maisVendido: true,
  },
  {
    id: "bomba-centrifuga-multiestagio",
    nome: "Bomba Centrífuga Multiestágio 2 CV",
    categoria: "bombas-centrifugas",
    preco: 1890.0,
    marca: "TorqueLine",
    descricao:
      "Alta pressão em múltiplos estágios para irrigação e sistemas prediais de grande porte.",
    especificacoes: [spec("Estágios", "4"), spec("Recalque", "62 m")],
    voltagens: ["220V", "380V"],
    potencias: ["1 CV", "2 CV"],
  },
  {
    id: "bomba-autoaspirante",
    nome: "Bomba Autoaspirante 1/2 CV",
    categoria: "bombas-centrifugas",
    preco: 559.9,
    marca: "HidroMax",
    descricao:
      "Autoaspirante com escorva rápida, ideal para caixas d'água enterradas e uso residencial.",
    especificacoes: [spec("Vazão máxima", "3.000 L/h"), spec("Sucção", "8 m")],
    voltagens: ["110V", "220V"],
    potencias: ["1/2 CV", "1 CV"],
  },
  {
    id: "motor-trifasico-2cv",
    nome: "Motor Elétrico Trifásico 2 CV 4 Polos",
    categoria: "motores-eletricos",
    preco: 1590.0,
    marca: "AB Force",
    descricao:
      "Motor trifásico de alto rendimento IR3, carcaça em alumínio, rolamentos blindados e proteção IP55.",
    especificacoes: [
      spec("Rotação", "1.750 rpm"),
      spec("Proteção", "IP55"),
      spec("Rendimento", "IR3"),
    ],
    voltagens: ["220V", "380V"],
    potencias: ["1 CV", "2 CV", "3 CV"],
    maisVendido: true,
  },
  {
    id: "motor-monofasico-1cv",
    nome: "Motor Elétrico Monofásico 1 CV",
    categoria: "motores-eletricos",
    preco: 890.0,
    precoAntigo: 990.0,
    marca: "TorqueLine",
    descricao:
      "Motor monofásico com capacitor de partida, indicado para bombas, compressores e máquinas leves.",
    especificacoes: [spec("Rotação", "3.500 rpm"), spec("Polos", "2")],
    voltagens: ["110V", "220V"],
    potencias: ["1/2 CV", "1 CV"],
  },
  {
    id: "motor-blindado-inox",
    nome: "Motor Blindado Inox 3 CV",
    categoria: "motores-eletricos",
    preco: 2450.0,
    marca: "AB Force",
    descricao: "Motor blindado com carcaça inox para ambientes agressivos e alta umidade.",
    especificacoes: [spec("Proteção", "IP66"), spec("Carcaça", "Inox 316")],
    voltagens: ["220V", "380V"],
    potencias: ["2 CV", "3 CV"],
  },
  {
    id: "pressurizador-automatico",
    nome: "Pressurizador Automático 350W",
    categoria: "pressurizadores",
    preco: 749.9,
    marca: "HidroMax",
    descricao:
      "Pressurizador silencioso com fluxostato eletrônico, garante pressão constante em chuveiros e torneiras.",
    especificacoes: [spec("Pressão", "1,5 bar"), spec("Ruído", "< 45 dB")],
    voltagens: ["110V", "220V"],
    potencias: ["1/2 CV"],
    maisVendido: true,
  },
  {
    id: "pressurizador-inverter",
    nome: "Pressurizador Inverter 1 CV",
    categoria: "pressurizadores",
    preco: 2190.0,
    marca: "AB Force",
    descricao:
      "Sistema com inversor de frequência que ajusta a rotação conforme a demanda, economizando energia.",
    especificacoes: [spec("Pressão", "3,0 bar"), spec("Controle", "Inverter")],
    voltagens: ["220V"],
    potencias: ["1 CV"],
  },
  {
    id: "kit-pressurizacao-predial",
    nome: "Kit Pressurização Predial 2 CV",
    categoria: "pressurizadores",
    preco: 3890.0,
    marca: "TorqueLine",
    descricao: "Kit completo com bomba, tanque de expansão e pressostato para prédios e condomínios.",
    especificacoes: [spec("Tanque", "24 L"), spec("Pressostato", "Incluso")],
    voltagens: ["220V", "380V"],
    potencias: ["2 CV"],
  },
  {
    id: "selo-mecanico",
    nome: "Selo Mecânico Cerâmica/Grafite 3/4",
    categoria: "pecas-reposicao",
    preco: 79.9,
    marca: "AB Parts",
    descricao: "Selo mecânico universal para bombas centrífugas de 3/4 de polegada.",
    especificacoes: [spec("Material", "Cerâmica/Grafite"), spec("Bitola", '3/4"')],
    voltagens: ["Universal"],
    potencias: ["Universal"],
  },
  {
    id: "capacitor-partida",
    nome: "Capacitor de Partida 40µF",
    categoria: "pecas-reposicao",
    preco: 49.9,
    marca: "AB Parts",
    descricao: "Capacitor eletrolítico de partida para motores monofásicos.",
    especificacoes: [spec("Capacitância", "40 µF"), spec("Tensão", "250V")],
    voltagens: ["110V", "220V"],
    potencias: ["Universal"],
  },
  {
    id: "rotor-noryl",
    nome: "Rotor em Noryl para Bomba Submersa",
    categoria: "pecas-reposicao",
    preco: 119.9,
    marca: "AB Parts",
    descricao: "Rotor de reposição em Noryl para bombas submersas de 4 polegadas.",
    especificacoes: [spec("Material", "Noryl"), spec("Compatibilidade", 'Bombas 4"')],
    voltagens: ["Universal"],
    potencias: ["Universal"],
    maisVendido: true,
  },
  {
    id: "chave-boia",
    nome: "Chave Boia de Nível Automática",
    categoria: "pecas-reposicao",
    preco: 89.9,
    marca: "AB Parts",
    descricao: "Chave boia com cabo de 2 metros para controle automático de nível.",
    especificacoes: [spec("Cabo", "2 m"), spec("Corrente", "10 A")],
    voltagens: ["110V", "220V"],
    potencias: ["Universal"],
  },
];

export const getProduto = (id: string) => produtos.find((p) => p.id === id);

export const porCategoria = (slug: string) => produtos.filter((p) => p.categoria === slug);

export const buscar = (termo: string) => {
  const t = termo.trim().toLowerCase();
  if (!t) return [];
  return produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(t) ||
      p.marca.toLowerCase().includes(t) ||
      p.descricao.toLowerCase().includes(t) ||
      (categorias.find((c) => c.slug === p.categoria)?.nome.toLowerCase().includes(t) ?? false),
  );
};

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const nomeCategoria = (slug: string) =>
  categorias.find((c) => c.slug === slug)?.nome ?? slug;
