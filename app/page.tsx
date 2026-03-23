"use client";

import { useEffect, useCallback } from "react";
import { ProgressBar } from "@/components/layout/ProgressBar";
import {
  SidebarIndex,
  SceneCounter,
  KeyboardHint,
  useActiveScene,
} from "@/components/layout/SidebarIndex";
import { BlockHeader } from "@/components/storyboard/BlockHeader";
import { SceneCard } from "@/components/storyboard/SceneCard";
import { SceneBreak } from "@/components/storyboard/SceneBreak";

/* ── Scene Data ─────────────────────────────────────────── */
const SCENE_IDS = [
  "cena-01","cena-02","cena-03","cena-04",
  "cena-05",
  "cena-06","cena-07","cena-08","cena-09",
  "cena-10","cena-11a","cena-11b","cena-11c",
];

const SCENES_BLOCO_1 = [
  {
    id: "cena-01",
    sceneTag: "CENA 01",
    timeTag: "00s – 06s",
    title: "O peso da dúvida",
    narration: "Toda empresa chega em um momento em que percebe que algo precisa mudar.",
    description: "Protagonista — mulher, blazer escuro, cabelo loiro — sentada à mesa de vidro, mão no queixo, olhar perdido pela janela. Luz natural fria lateral. Câmera parada. Peso e introspecção.",
    prompt: "cinematic portrait, businesswoman sitting at glass desk, hand on chin, thoughtful gaze toward window, natural cold side light, modern office, shallow depth of field, muted cool tones, still camera, film grain",
    imageSrc: "/CENA_1.png",
    imageAlt: "Protagonista sentada à mesa de vidro, pensativa",
  },
  {
    id: "cena-02",
    sceneTag: "CENA 02",
    timeTag: "06s – 16s",
    title: "Processos que não avançam",
    narration: "Os processos começam a ficar confusos. Informações ficam espalhadas. Tarefas importantes ainda dependem de trabalho manual.",
    description: "Protagonista e homem de terno azul escuro em mesa de vidro com documentos espalhados. Ela aponta pro papel, ele de braços cruzados. Tensão silenciosa. Câmera lenta recuando.",
    prompt: "two business professionals at glass desk covered in documents, woman pointing at papers, man with arms crossed, tense silent tension, no screens, slow dolly out, cinematic, film grain",
    imageSrc: "/CENA_2.png",
    imageAlt: "Dois profissionais em mesa de vidro com documentos",
  },
  {
    id: "cena-03",
    sceneTag: "CENA 03",
    timeTag: "16s – 26s",
    title: "A estrutura que não acompanha",
    narration: "A operação começa a crescer… mas a estrutura não acompanha.",
    description: "Homem jovem com blazer cáqui caminhando por corredor com paredes de vidro carregando pilha de papéis, olhar perdido. Luz quente de teto. Câmera lateral câmera lenta.",
    prompt: "young professional walking glass-walled corridor carrying stack of papers, distracted expression, slow lateral tracking shot, warm overhead lighting, no screens, cinematic, film grain",
    imageSrc: "/CENA_3.png",
    imageAlt: "Homem jovem carregando papéis pelo corredor",
  },
  {
    id: "cena-04",
    sceneTag: "CENA 04",
    timeTag: "26s – 34s",
    title: "Trabalhando em volta da tecnologia",
    narration: "A empresa passa a trabalhar em volta da tecnologia. Quando deveria ser o contrário.",
    description: "Homem de costas em terno cinza diante de janela panorâmica com cidade brumosa. Mesa vazia ao lado. Isolamento e peso da decisão. Câmera parada.",
    prompt: "businessman back to camera, large panoramic window, grey hazy city view, empty table beside, still camera, cold tones, cinematic isolation, film grain",
    imageSrc: "/CENA_4.png",
    imageAlt: "Homem de costas diante da janela panorâmica",
  },
];

const SCENES_BLOCO_3 = [
  {
    id: "cena-06",
    sceneTag: "CENA 06",
    timeTag: "38s – 46s",
    title: "Entendendo antes de construir",
    narration: "Antes de qualquer desenvolvimento, buscamos entender como a empresa funciona. Como os processos acontecem. Onde estão os gargalos.",
    description: "Dois profissionais com caderno de esboços mostrando fluxo à mão. Um explica, o outro sorri interessado. Luz quente natural. Clima leve, sem telas.",
    prompt: "two professionals at table, one holding hand-drawn notebook sketch, other leaning in smiling, warm natural light, relaxed collaborative mood, no screens, cinematic shallow focus, film grain",
    imageSrc: "/cena_6.png",
    imageAlt: "Dois profissionais analisando caderno de esboços",
  },
  {
    id: "cena-07",
    sceneTag: "CENA 07",
    timeTag: "46s – 54s",
    title: "Visualizar para decidir melhor",
    narration: "Utilizamos protótipos, demonstrações e visualizações para explorar ideias e validar caminhos. Porque visualizar uma solução ajuda a tomar decisões melhores.",
    description: "Homem apresentando whiteboard com fluxograma à mão. Mulher ao lado observa. Câmera lenta aproximando. Janela ao fundo.",
    prompt: "man presenting hand-drawn flowchart on whiteboard, woman beside watching carefully, slow push-in, natural window light, engaged energy, cinematic, film grain",
    imageSrc: "/CENA_7.png",
    imageAlt: "Apresentação de fluxograma no whiteboard",
  },
  {
    id: "cena-08",
    sceneTag: "CENA 08",
    timeTag: "54s – 62s",
    title: "O time em ação",
    narration: "Sistemas. Aplicativos. Automações. Tudo pensado para acompanhar o crescimento do negócio.",
    description: "Wide shot de quatro devs em mesa longa. Luz azul fria da cidade ao fundo contrasta com lâmpadas quentes. Plantas, livros, canecas. Produtividade tranquila.",
    prompt: "wide shot four developers long shared desk, cold blue city night through windows contrasting warm desk lamps, plants books mugs, calm productive atmosphere, cinematic evening, film grain",
    imageSrc: "/CENA_8.png",
    imageAlt: "Quatro desenvolvedores em mesa compartilhada",
  },
  {
    id: "cena-09",
    sceneTag: "CENA 09",
    timeTag: "62s – 68s",
    title: "Cada empresa tem sua forma de operar",
    narration: "Porque cada empresa tem sua própria forma de operar.",
    description: "Grid 4 takes: mão no mouse + escrevendo no caderno; dev de costas com dev feminina concentrada de frente; dev masculino em close frontal no monitor; dev feminina escrevendo sob abajur.",
    prompt: "cinematic 4-panel split: hand on mouse with notebook writing, dev from behind with focused female dev ahead, male dev intense monitor close-up, female dev writing under warm lamp, blue-warm office ambiance",
    imageSrc: "/CENA_9.png",
    imageAlt: "Grid de 4 takes de desenvolvedores",
  },
  {
    id: "cena-10",
    sceneTag: "CENA 10",
    timeTag: "68s – 75s",
    title: "Quando a tecnologia respeita essa realidade",
    narration: "E quando a tecnologia respeita essa realidade, ela deixa de ser um obstáculo. E passa a ser parte da estratégia.",
    description: "Grid 4 takes: dois devs wide shot, um pegando caneca; close extremo nas mãos digitando no laptop; dev feminina em close foco suave; dev masculino desfocado com planta e livros em bokeh.",
    prompt: "cinematic 4-panel: two devs wide one reaching for coffee, extreme close-up hands typing laptop, female dev soft portrait, male dev blurred with plant books bokeh, warm-blue palette",
    imageSrc: "/CENA_10.png",
    imageAlt: "Grid de 4 takes — tecnologia na prática",
  },
  {
    id: "cena-11a",
    sceneTag: "CENA 11·A",
    timeTag: "75s – 80s",
    title: "A notícia chega",
    narration: "E passa a ser parte da estratégia.",
    description: "Protagonista do início — mesmo blazer escuro — estendendo o braço pela mesa limpa para pegar o celular. Luz dourada de fim de tarde. Mesa organizada, sem papéis.",
    prompt: "businesswoman dark blazer reaching across clean desk for phone, warm golden afternoon light, organized desk, slow motion, cinematic, same character as opening",
    imageSrc: "/CENA_11_-_1.png",
    imageAlt: "Protagonista alcançando o celular na mesa limpa",
  },
  {
    id: "cena-11b",
    sceneTag: "CENA 11·B",
    timeTag: "80s – 85s",
    title: "O alívio genuíno",
    narration: "No fim das contas, nosso trabalho não é apenas desenvolver software. É ajudar empresas a transformar desafios operacionais em tecnologia que realmente funciona no dia a dia.",
    description: "Close no rosto da protagonista com sorriso genuíno olhando pro celular. Olhos levemente cerrados. Luz quente lateral. Resolução emocional pura.",
    prompt: "close-up portrait businesswoman genuine soft smile looking at phone, eyes slightly squinted in relief, warm side light, shallow depth of field, dark background, cinematic, film grain",
    imageSrc: "/CENA_11_-_2.png",
    imageAlt: "Close no rosto da protagonista sorrindo",
  },
  {
    id: "cena-11c",
    sceneTag: "CENA 11·C",
    timeTag: "85s – 95s",
    title: "Parte da estratégia",
    narration: "Porque tecnologia só faz sentido quando acompanha a evolução da empresa.",
    description: "Protagonista de pé diante da janela panorâmica, vista 3/4, olhando o horizonte com luz dourada de pôr do sol. Postura aberta, mãos relaxadas. Último take antes do logo.",
    prompt: "businesswoman panoramic window three-quarter view, golden sunset light, city below, open relaxed posture, cinematic wide shot, lens flare, hopeful resolved mood, film grain",
    imageSrc: "/CENA_11_-_3.png",
    imageAlt: "Protagonista diante da janela panorâmica no pôr do sol",
  },
];

/* ── Page Component ─────────────────────────────────────── */
export default function StoryboardPage() {
  const { activeId, navigate } = useActiveScene();

  /* Keyboard navigation */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const idx = SCENE_IDS.indexOf(activeId);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = SCENE_IDS[Math.min(idx + 1, SCENE_IDS.length - 1)];
        navigate(next);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = SCENE_IDS[Math.max(idx - 1, 0)];
        navigate(prev);
      }
    },
    [activeId, navigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* ── Fixed chrome ── */}
      <ProgressBar />
      <SidebarIndex activeId={activeId} onNavigate={navigate} />
      <SceneCounter activeId={activeId} />
      <KeyboardHint />

      {/* ── Page content ── */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 xl:pl-24 pb-0">

        {/* ═══ HEADER ══════════════════════════════════ */}
        <header className="pt-20 pb-16">
          <div className="accent-line mb-5" />
          <p className="font-institutional text-[11px] font-medium tracking-[0.25em] uppercase text-[#2E2EFE] mb-3">
            Inovaxio · Brandbook v2.0
          </p>
          <h1 className="font-institutional font-bold text-4xl md:text-5xl text-white leading-[1.05] mb-4 text-glow">
            Storyboard
          </h1>
          <p className="font-digital text-sm text-white/45 max-w-lg leading-relaxed">
            Roteiro visual interativo do vídeo institucional da Inovaxio.
            Use as setas do teclado para navegar entre as cenas.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <span
              className="inline-flex items-center gap-2 font-mono-brand text-[11px]
                         text-[#2E2EFE] border border-[rgba(46,46,254,0.5)] rounded px-3 py-1"
              style={{ background: "rgba(35,31,32,0.9)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E2EFE] animate-glow-pulse" />
              13 cenas
            </span>
            <span className="font-mono-brand text-[10px] text-white/30">~95 segundos</span>
          </div>
        </header>

        {/* ═══ BLOCO 1 — O PROBLEMA ════════════════════ */}
        <div id="bloco-1">
          <BlockHeader number="01" label="— O Problema —" />
          <div className="flex flex-col gap-0.5">
            {SCENES_BLOCO_1.map((scene, i) => (
              <SceneCard
                key={scene.id}
                {...scene}
                isActive={activeId === scene.id}
                reversed={i % 2 !== 0}
              />
            ))}
          </div>
        </div>

        {/* ═══ BLOCO 2 — A VIRADA ══════════════════════ */}
        <div id="bloco-2">
          <BlockHeader number="02" label="— A Virada —" />
          <SceneBreak
            id="cena-05"
            sceneTag="CENA 05"
            timeTag="34s – 38s"
            text="QUANDO DEVERIA SER O CONTRÁRIO"
            sub="[ virada narrativa ]"
            description="Tela preta com texto espaçado. Pausa dramática. Ruptura narrativa antes da resolução."
            prompt="[motion graphic — fade in sobre preto puro, Quicksand, letter-spacing amplo, glow azul elétrico, 4 segundos]"
          />
        </div>

        {/* ═══ BLOCO 3 — A SOLUÇÃO ═════════════════════ */}
        <div id="bloco-3">
          <BlockHeader number="03" label="— A Solução —" />
          <div className="flex flex-col gap-0.5">
            {SCENES_BLOCO_3.map((scene, i) => (
              <SceneCard
                key={scene.id}
                {...scene}
                isActive={activeId === scene.id}
                reversed={i % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ═══ FOOTER ══════════════════════════════════ */}
      <footer
        className="mt-2 flex flex-col items-center justify-center gap-4 px-8 py-20 text-center"
        style={{
          background: "#000",
          backgroundImage: "radial-gradient(ellipse at center, rgba(46,46,254,0.07) 0%, #000 60%)",
        }}
      >
        <div className="accent-line mx-auto" />
        <img
          src="/inovaxio-logo.svg"
          alt="Inovaxio"
          className="h-14 w-auto footer-glow opacity-90"
        />
        <p className="font-digital text-sm italic text-white/35">
          Transformamos ideias em realidade digital.
        </p>
        <div className="separator-blue h-px w-10 mx-auto" />
        <p className="font-mono-brand text-[10px] text-white/20 tracking-widest">
          13 cenas · ~95 segundos · Brandbook v2.0
        </p>
      </footer>
    </>
  );
}
