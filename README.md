# AB Moto Bombas E-commerce

Atue como um Desenvolvedor Frontend e UI/UX Designer especialista. Crie a interface completa de um e-commerce moderno e responsivo para uma loja especializada chamada AB MOTO BOMBAS. O projeto deve ser um protótipo funcional, com navegação entre páginas e lógica de estado (use React Router e React Context/Zustand).

O design deve ser limpo, transmitir força e confiança, utilizando componentes modernos construídos estritamente com Tailwind CSS v3 e React. A paleta de cores deve remeter ao setor (ex: tons de azul escuro, cinza metálico e detalhes em um azul vibrante ou laranja para conversão), com fundo claro.

Implemente as seguintes páginas, componentes e funcionalidades:

1. Header (Cabeçalho) e Footer (Rodapé):

Header: Nome/Logo "AB MOTO BOMBAS" em destaque. Barra de pesquisa ampla ("Busque por bombas, motores, peças..."). Ícones funcionais de "Minha Conta", "Favoritos" e "Carrinho".

Footer: Informações de contato em destaque (telefone, e-mail, endereço físico), links úteis (Garantia, Assistência Técnica, Prazos de Entrega) e métodos de pagamento.

WhatsApp FAB: Um botão flutuante (Floating Action Button) fixo no canto inferior direito com o ícone do WhatsApp em verde, com um efeito de pulso suave (animate-pulse) indicando "Atendimento Técnico".

2. Home (Vitrine Principal):

Hero Section: Banner atraente com o texto: "A força que você precisa: Soluções completas em Moto Bombas e Equipamentos." Botão CTA: "Ver Ofertas".

Navegação Rápida (Cards/Ícones): Bombas Submersas, Bombas Centrífugas, Motores Elétricos, Pressurizadores, Peças de Reposição.

Vitrine de Produtos: Grid com os Mais Vendidos (ex: "Bomba Submersa 1HP", "Motor Elétrico Trifásico").

3. Telas de Autenticação:

Login: Página simples e moderna (e-mail, senha, "Entrar", "Esqueci minha senha").

Logout: No Header, adicione a opção de "Sair/Logout" para o usuário logado, redirecionando para a Home ao clicar.

4. Gerenciamento de Carrinho e Checkout (Regra Específica):

Tela de Carrinho: Qualquer botão "Adicionar ao Carrinho" do site deve enviar o produto para esta página.

Lógica de Exclusão (Soft Delete): No carrinho, ao clicar em "Excluir", o produto não deve sumir imediatamente. O card deve ficar cinza (opacidade reduzida/desativado), o valor removido do total, e o botão deve mudar para "Adicionar Novamente" (Undo). Esse item cinza permanece na tela até o próximo refresh da página.

Checkout via WhatsApp: O botão "Finalizar Pedido" deve capturar os itens e o valor total do carrinho, abrindo automaticamente a API do WhatsApp com uma mensagem pré-formatada para o setor de vendas.

5. Tela de Detalhes do Produto (PDP):

Página interna contendo imagem grande, preço, descrição técnica detalhada e botão de compra.

Variações: Adicione botões de seleção de variações essenciais para este nicho (ex: Voltagem 110V/220V, Potência 1/2 CV, 1 CV, 2 CV).

Seções dinâmicas de "Produtos Relacionados" e "Vistos por Último".

6. Navegação, Menu e Favoritos:

Favoritos: Uma página "Meus Favoritos" que lista todos os itens em que o usuário clicou no ícone de coração.

Menu Inteligente: No desktop, dropdown no hover. No mobile, menu hambúrguer que abre uma gaveta (drawer) com as categorias.

7. Lógica de Pesquisa e Mock Data:

Crie um banco de dados falso (Mock Data) abrangente. Cada categoria do menu deve listar produtos diferentes e condizentes com o tema.

A barra de pesquisa do Header deve filtrar e mostrar apenas os produtos do Mock Data que correspondam ao termo digitado.

8. UI/UX Refinamentos (Empty States e Feedbacks Visuais):

Empty States: Crie telas amigáveis para Carrinho vazio, Favoritos vazios e "Nenhum produto encontrado" na pesquisa (oferecendo botões para voltar às compras ou ver categorias).

Toasts/Notificações: Adicione pequenos avisos visuais no canto da tela confirmando o sucesso sempre que um item for adicionado ao carrinho ou aos favoritos.

O design deve ser 100% responsivo (Mobile-first) e o idioma deve ser Português do Brasil (PT-BR).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://abmotobombas.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/40b38974-ad26-4b45-acea-1d30e139fc13).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
