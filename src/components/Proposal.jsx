import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export const Proposal = () => {
    const [si, setSi] = useState(false);

    useEffect(() => {
        const handleGlobalClick = (e) => {
            // Confeti en la posición del click
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            confetti({
                particleCount: 15,
                spread: 60,
                origin: { x, y },
                zIndex: 50,
                ticks: 200,
                gravity: 1.2,
                colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']
            });
        };

        window.addEventListener('click', handleGlobalClick);

        return () => {
            window.removeEventListener('click', handleGlobalClick);
        };
    }, []);

    const lanzarConfeti = () => {
        setSi(true);
        // Lanza confeti por 3 segundos
        var duration = 3 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        var interval = setInterval(function () {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
        }, 250);
    };

    const moverBoton = (e) => {
        // Mueve el botón "No" a una posición aleatoria segura
        const buttonWidth = e.target.offsetWidth;
        const buttonHeight = e.target.offsetHeight;

        // Espacio de seguridad para que no quede pegado al borde
        const padding = 20;

        // Calcular límites seguros
        const maxX = window.innerWidth - buttonWidth - padding;
        const maxY = window.innerHeight - buttonHeight - padding;
        const minX = padding;
        const minY = padding;

        const x = Math.random() * (maxX - minX) + minX;
        const y = Math.random() * (maxY - minY) + minY;

        e.target.style.position = 'fixed'; // Usar fixed para asegurar que sea relativo a la ventana
        e.target.style.left = `${x}px`;
        e.target.style.top = `${y}px`;
    };

    if (si) {
        return (
            <div className="text-center animate-bounce">
                <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-4">¡Sabía que dirías que sí, ERES LA MEJOR ! ❤️</h1>
                <p className="text-xl text-gray-700">Feliz mesario, mi cielito lindo de ojos morenos.</p>
                <div className="mt-8 text-8xl">🥰💐🥰💐🥰💐</div>
            </div>
        );
    }

    return (
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-lg mx-auto text-center border-4 border-pink-200">
            <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mb-6">
                Feliz mesario, preciosa 🌹
            </h1>
            <p className="text-lg text-gray-600 mb-8 font-medium">
                88 mesesotes a tu lado corazon 🥰 y ahora tengo una pregunta importante:
                <br /><br />
                <span className="text-2xl font-bold text-red-500">¿Quieres ser mi Valentine?</span>
            </p>

            <div className="flex justify-center gap-10 items-center relative h-20">
                {/* Botón SÍ */}
                <button
                    onClick={lanzarConfeti}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transform transition hover:scale-110"
                >
                    ¡Sí, obvio! 😍
                </button>

                {/* Botón NO */}
                <button
                    onMouseEnter={moverBoton}
                    onClick={moverBoton}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transition-all"
                >
                    No 😢
                </button>
            </div>
        </div>
    );
}
