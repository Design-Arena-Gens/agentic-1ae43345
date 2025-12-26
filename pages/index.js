import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentScene, setCurrentScene] = useState(0)
  const audioRef = useRef(null)
  const timeoutRef = useRef(null)

  const scenes = [
    {
      duration: 8000,
      title: "Dream of Dubai?",
      subtitle: "Your Journey Starts Here",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      image: "🏙️"
    },
    {
      duration: 10000,
      title: "Dubai Visa",
      subtitle: "Only ₹7,499",
      highlight: "Unbeatable Price!",
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      image: "✈️"
    },
    {
      duration: 12000,
      title: "Ciroc Travel",
      subtitle: "India's Best Travel Expert",
      highlight: "Fastest Growing in Visa Industry",
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      image: "🌟"
    },
    {
      duration: 10000,
      title: "Trust & Reliability",
      subtitle: "Our Promise to You",
      highlight: "Where Your Dreams Meet Reality",
      background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      image: "🤝"
    },
    {
      duration: 10000,
      title: "Get Your Dubai Visa Today!",
      subtitle: "www.ciroctravel.com",
      contact: "📞 9969499579 | ✉️ ciroctravels@yahoo.com",
      background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      image: "🎯"
    }
  ]

  const voiceScript = [
    "Are you dreaming of Dubai? Your journey starts here!",
    "Get your Dubai Visa for just 7,499 rupees! An unbeatable price!",
    "Ciroc Travel - India's best travel expert and the fastest growing company in the visa industry.",
    "At Ciroc Travel, trust and reliability come first. We're here to turn your dreams into reality.",
    "Visit www.ciroctravel.com or call 9969499579. Email us at ciroctravels@yahoo.com. Book your Dubai visa today!"
  ]

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const speak = (text, rate = 0.95) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = rate
      utterance.pitch = 1
      utterance.volume = 1
      utterance.lang = 'en-IN'
      window.speechSynthesis.speak(utterance)
    }
  }

  const startVideo = () => {
    setIsPlaying(true)
    setCurrentScene(0)
    playScene(0)
  }

  const playScene = (sceneIndex) => {
    if (sceneIndex >= scenes.length) {
      setIsPlaying(false)
      setCurrentScene(0)
      return
    }

    setCurrentScene(sceneIndex)
    speak(voiceScript[sceneIndex])

    timeoutRef.current = setTimeout(() => {
      playScene(sceneIndex + 1)
    }, scenes[sceneIndex].duration)
  }

  const stopVideo = () => {
    setIsPlaying(false)
    setCurrentScene(0)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }

  const currentSceneData = scenes[currentScene]

  return (
    <>
      <Head>
        <title>Ciroc Travel - Dubai Visa ₹7,499</title>
        <meta name="description" content="Get your Dubai Visa for just ₹7,499 with Ciroc Travel - India's fastest growing visa company" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isPlaying ? currentSceneData.background : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        transition: 'background 1s ease-in-out',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {!isPlaying ? (
          <div style={{
            textAlign: 'center',
            color: 'white',
            zIndex: 10
          }}>
            <h1 style={{
              fontSize: '4rem',
              marginBottom: '2rem',
              textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
              animation: 'pulse 2s infinite'
            }}>
              Ciroc Travel
            </h1>
            <p style={{
              fontSize: '1.5rem',
              marginBottom: '3rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Dubai Visa Advertisement
            </p>
            <button
              onClick={startVideo}
              style={{
                padding: '20px 50px',
                fontSize: '1.5rem',
                background: 'white',
                color: '#667eea',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                transition: 'transform 0.2s',
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              ▶ Play Video
            </button>
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            color: 'white',
            padding: '2rem',
            maxWidth: '1200px',
            animation: 'fadeIn 0.8s ease-in'
          }}>
            <div style={{
              fontSize: '10rem',
              marginBottom: '2rem',
              animation: 'scaleIn 0.8s ease-out'
            }}>
              {currentSceneData.image}
            </div>

            <h1 style={{
              fontSize: '5rem',
              marginBottom: '1rem',
              textShadow: '4px 4px 8px rgba(0,0,0,0.4)',
              fontWeight: 'bold',
              animation: 'slideInFromLeft 0.8s ease-out'
            }}>
              {currentSceneData.title}
            </h1>

            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '2rem',
              textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
              animation: 'slideInFromRight 0.8s ease-out'
            }}>
              {currentSceneData.subtitle}
            </h2>

            {currentSceneData.highlight && (
              <div style={{
                fontSize: '2rem',
                padding: '1rem 2rem',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                display: 'inline-block',
                marginBottom: '2rem',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                animation: 'pulse 2s infinite'
              }}>
                {currentSceneData.highlight}
              </div>
            )}

            {currentSceneData.contact && (
              <div style={{
                fontSize: '1.8rem',
                marginTop: '2rem',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                animation: 'fadeIn 1s ease-in'
              }}>
                {currentSceneData.contact}
              </div>
            )}

            <button
              onClick={stopVideo}
              style={{
                position: 'absolute',
                top: '30px',
                right: '30px',
                padding: '15px 30px',
                fontSize: '1.2rem',
                background: 'rgba(255,255,255,0.3)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                border: '2px solid white',
                borderRadius: '30px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.5)'
                e.target.style.transform = 'scale(1.05)'
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.3)'
                e.target.style.transform = 'scale(1)'
              }}
            >
              ⏸ Stop
            </button>

            <div style={{
              position: 'absolute',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '10px'
            }}>
              {scenes.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: currentScene === index ? 'white' : 'rgba(255,255,255,0.4)',
                    transition: 'all 0.3s'
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideInFromLeft {
            from {
              transform: translateX(-100px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes slideInFromRight {
            from {
              transform: translateX(100px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes scaleIn {
            from {
              transform: scale(0);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}</style>
      </div>
    </>
  )
}
