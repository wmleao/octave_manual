/* copiar texto do bloco de código */
function copiarCodigo(btn) {
  // O botão está dentro do <pre>; o código é o próximo elemento <code> ou filho
  const pre = btn.parentElement;
  const code = pre.querySelector('code');
  if (!code) return;

  // Remove linhas vazias no início e no fim
  let text = code.innerText.replace(/^\s*\n/, '').replace(/\n\s*$/, '');
  
  // Versão mais robusta para múltiplas linhas vazias:
  text = text.replace(/^\s*\n+/, '').replace(/\n+\s*$/, '');

  navigator.clipboard.writeText(text).then(() => {
	const original = btn.innerText;
	btn.innerText = "✅ Copiado!";
	setTimeout(() => btn.innerText = original, 1600);
  }).catch(() => {
	alert('Erro ao copiar. Tente manualmente.');
  });
}


// Reaplica Prism para destacar sintaxe quando o conteúdo muda dinamicamente
function realcarSintaxe() {
  if (window.Prism) {
    Prism.highlightAll();
  }
}


document.addEventListener('DOMContentLoaded', () => {
  realcarSintaxe();
  configurarSidebar();
});

// Configura comportamento da sidebar e área de hover
function configurarSidebar() {
  const sidebar = document.getElementById('sidebar');
  const hoverArea = document.getElementById('hover-area');
  const content = document.getElementById('content');

  if (!sidebar || !hoverArea || !content) {
    console.warn('Elementos sidebar, hover-area ou content não encontrados.');
    return;
  }

  // Oculta a barra lateral quando o mouse sai dela
  sidebar.addEventListener('mouseleave', () => {
    sidebar.classList.add('hidden');
    content.classList.add('full');
  });

  // Mostra a barra lateral quando o mouse entra na área de hover
  hoverArea.addEventListener('mouseenter', () => {
    sidebar.classList.remove('hidden');
    content.classList.remove('full');
  });
}