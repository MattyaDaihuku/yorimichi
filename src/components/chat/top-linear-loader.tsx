"use client";

export function TopLinearLoader() {
    return (
        <>
            <div className="linearLoaderFixed" aria-hidden="true">
                <div className="linearLoaderContainer">
                    <div className="linearLoaderBar" />
                </div>
            </div>

            <style jsx>{`
                .linearLoaderFixed {
                    position: fixed;
                    top: calc(4rem + env(safe-area-inset-top));
                    left: 0;
                    right: 0;
                    z-index: 30;
                }

                @media (min-width: 768px) {
                    .linearLoaderFixed {
                        left: 72px;
                    }
                }

                .linearLoaderContainer {
                    width: 100%;
                    height: 4px;
                    background-color: #e3e8f0;
                    position: relative;
                    overflow: hidden;
                }

                .linearLoaderBar {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    background: linear-gradient(90deg, #4285f4, #9b72cb, #d96570);
                    animation: sweep 1.5s infinite ease-in-out;
                }

                @keyframes sweep {
                    0% {
                        left: -50%;
                        width: 30%;
                    }
                    50% {
                        left: 20%;
                        width: 80%;
                    }
                    100% {
                        left: 100%;
                        width: 30%;
                    }
                }
            `}</style>
        </>
    );
}
