// ============================================================
// CONFIGURAÇÃO: é só aqui que você mexe
// ============================================================
const PASTA = 'imagens/';      // relativa ao index.html
const EXTENSAO = '.webp';       // troque para '.png' ou '.webp' se for o caso
const INTERVALO = 6000;        // ms entre uma imagem e a próxima
const LARGURA_DESKTOP = 768;   // a partir daqui usa o conjunto "desktop" (tablet e PC)

// Uma linha por imagem. 'mobile' e 'desktop' são o nome do arquivo SEM extensão.
// 'cores' = paleta que combina com a imagem (fundo da página, campos e botões).
// 'posicao' (opcional) = parte da imagem que fica visível no recorte, ex.: 'left bottom'.
const SLIDES = [
    { mobile: 'img-001', desktop: 'img-015',
      cores: { fundoA: '#167098', fundoB: '#5d8497', campo: '#165e7e', campoClaro: '#c7dce6', botao: '#427994', botaoHover: '#2f566a', texto: '#2c5163', hoverClaro: '#d5e4ec' } },
    { mobile: 'img-002', desktop: 'img-016',
      cores: { fundoA: '#88222f', fundoB: '#2a516f', campo: '#7a1f2a', campoClaro: '#c4d9e9', botao: '#3f79a6', botaoHover: '#2e597a', texto: '#274c68', hoverClaro: '#d3e2ee' } },
    { mobile: 'img-003', desktop: 'img-017',
      cores: { fundoA: '#6d6741', fundoB: '#758570', campo: '#5d5837', campoClaro: '#d4dad3', botao: '#697764', botaoHover: '#4c5648', texto: '#444e41', hoverClaro: '#dfe3de' } },
    { mobile: 'img-004', desktop: 'img-018',
      cores: { fundoA: '#956318', fundoB: '#d09625', campo: '#754e15', campoClaro: '#e9dcc4', botao: '#936e25', botaoHover: '#624919', texto: '#6e521c', hoverClaro: '#f0e5d1' } },
    { mobile: 'img-005', desktop: 'img-019',
      cores: { fundoA: '#47110a', fundoB: '#946861', campo: '#45130c', campoClaro: '#e6cbc7', botao: '#b05c4f', botaoHover: '#86463c', texto: '#63342c', hoverClaro: '#ecd8d5' } },
    { mobile: 'img-006', desktop: 'img-020',
      cores: { fundoA: '#1a384e', fundoB: '#5487a1', campo: '#1a384e', campoClaro: '#c7dbe6', botao: '#447b97', botaoHover: '#31596d', texto: '#2c5063', hoverClaro: '#d5e4ec' } },
    { mobile: 'img-007', desktop: 'img-021',
      cores: { fundoA: '#31717c', fundoB: '#6d8873', campo: '#285d66', campoClaro: '#d2dbd4', botao: '#627a67', botaoHover: '#47584a', texto: '#404f43', hoverClaro: '#dde4df' } },
    { mobile: 'img-008', desktop: 'img-022',
      cores: { fundoA: '#435c6a', fundoB: '#69818c', campo: '#3b515e', campoClaro: '#c7dce6', botao: '#427a94', botaoHover: '#2f576a', texto: '#2c5163', hoverClaro: '#d5e5ec' } },
    { mobile: 'img-009', desktop: 'img-023',
      cores: { fundoA: '#2a2c25', fundoB: '#475247', campo: '#2a2c25', campoClaro: '#d3d9d3', botao: '#687868', botaoHover: '#4c574c', texto: '#424d42', hoverClaro: '#dee3de' } },
    { mobile: 'img-011', desktop: 'img-024',
      cores: { fundoA: '#242a2f', fundoB: '#908065', campo: '#242a2f', campoClaro: '#e6dac7', botao: '#8d703f', botaoHover: '#634e2c', texto: '#634e2c', hoverClaro: '#ece3d5' } },
    { mobile: 'img-012', desktop: 'img-025',
      cores: { fundoA: '#575757', fundoB: '#7a7a7a', campo: '#4c4c4c', campoClaro: '#d6d6d6', botao: '#757575', botaoHover: '#565656', texto: '#474747', hoverClaro: '#e0e0e0' } },
    { mobile: 'img-013', desktop: 'img-026',
      cores: { fundoA: '#323232', fundoB: '#4c4c4c', campo: '#323232', campoClaro: '#d6d6d6', botao: '#757575', botaoHover: '#565656', texto: '#474747', hoverClaro: '#e0e0e0' } },
    { mobile: 'img-014', desktop: 'img-027',
      cores: { fundoA: '#645d4a', fundoB: '#9c8d59', campo: '#585241', campoClaro: '#e6dfc7', botao: '#82723a', botaoHover: '#584d27', texto: '#63562c', hoverClaro: '#ece7d5' } },
];

// Paleta usada se uma linha não tiver 'cores' (é a sua paleta original)
const PADRAO = { fundoA: '#5f2c82', fundoB: '#49a09d', campo: '#5f2c82', campoClaro: '#94cfcd', botao: '#53aaa7', botaoHover: '#2d6462', texto: '#2d6462', hoverClaro: '#6cd3cf' };

// ============================================================
// LÓGICA: não precisa mexer
// ============================================================
const VARIAVEIS = {
    fundoA: '--fundo-a', fundoB: '--fundo-b', campo: '--campo', campoClaro: '--campo-claro',
    botao: '--botao', botaoHover: '--botao-hover', texto: '--texto', hoverClaro: '--hover-claro'
};

const camadas = document.querySelectorAll('#imagem .camada');
const consulta = window.matchMedia(`(min-width: ${LARGURA_DESKTOP}px)`);
let atual = 0;
let camadaAtiva = 0;
let falhas = 0;
let timer = null;
let pedido = 0;

function caminho(slide) {
    return PASTA + (consulta.matches ? slide.desktop : slide.mobile) + EXTENSAO;
}

function aplicarCores(cores) {
    const paleta = { ...PADRAO, ...cores };
    for (const chave in VARIAVEIS) {
        document.documentElement.style.setProperty(VARIAVEIS[chave], paleta[chave]);
    }
}

function mostrar(indice) {
    const slide = SLIDES[indice];
    const url = caminho(slide);
    const meu = ++pedido;
    const img = new Image();
    img.onload = () => {
        if (meu !== pedido) return;
        falhas = 0;
        const proxima = 1 - camadaAtiva;
        camadas[proxima].style.backgroundImage = `url("${url}")`;
        camadas[proxima].style.backgroundPosition = slide.posicao || 'center';
        camadas[proxima].classList.add('ativa');
        camadas[camadaAtiva].classList.remove('ativa');
        camadaAtiva = proxima;
        atual = indice;
        aplicarCores(slide.cores);
    };
    img.onerror = () => {
        if (meu !== pedido) return;
        console.warn('Imagem não encontrada:', url);
        falhas++;
        if (falhas < SLIDES.length) mostrar((indice + 1) % SLIDES.length);
    };
    img.src = url;
}

function iniciar() {
    parar();
    timer = setInterval(() => mostrar((atual + 1) % SLIDES.length), INTERVALO);
}

function parar() {
    clearInterval(timer);
}

consulta.addEventListener('change', () => mostrar(atual));
document.addEventListener('visibilitychange', () => (document.hidden ? parar() : iniciar()));

mostrar(0);
iniciar();