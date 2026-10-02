import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-8 pb-8 sm:pt-14 sm:pb-12 border-b border-obsidian-800/60 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans leading-[1.15]">
            本页展示的梯子均可免费使用
            <span className="block text-obsidian-400 font-normal text-xl sm:text-2xl lg:text-3xl mt-2">
              有主力梯子的，也可当作应急备用
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
};
