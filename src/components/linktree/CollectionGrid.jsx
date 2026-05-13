import { useState, useEffect } from 'react'

// Mock NFT data - nanti diganti dengan real wallet data
const MOCK_NFTS = [
  {
    id: 1,
    name: 'Bored Ape #1234',
    image: 'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=384',
    collection: 'Bored Ape Yacht Club',
    tokenId: '1234',
  },
  {
    id: 2,
    name: 'Azuki #5678',
    image: 'https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&w=384',
    collection: 'Azuki',
    tokenId: '5678',
  },
  {
    id: 3,
    name: 'Doodle #9012',
    image: 'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&w=384',
    collection: 'Doodles',
    tokenId: '9012',
  },
  {
    id: 4,
    name: 'Clone X #3456',
    image: 'https://i.seadn.io/gae/XN0XuD8Uh3jyRWNtPTFeXJg_ht8m5ofDx6aHklOiy4amhFuWUa0JaR6It49AH8tlnYS386Q0TW_-Lmedn0UET_ko1a3CbJGeu5iHMg?auto=format&w=384',
    collection: 'Clone X',
    tokenId: '3456',
  },
]

export default function CollectionGrid({ 
  theme, 
  cornerRadius = '16px',
  hoverZoom = 1,
  cardBgStyle = {},
  textColor = '#ffffff',
  font = 'Inter',
  editMode = false,
}) {
  const [nfts, setNfts] = useState([])
  const [walletConnected, setWalletConnected] = useState(false)
  const [stakedNfts, setStakedNfts] = useState({}) // { nftId: { progress: 0-100, startTime: timestamp } }
  const [claimedPoints, setClaimedPoints] = useState(0)

  // Simulate wallet connection
  const handleConnectWallet = () => {
    setWalletConnected(true)
    setNfts(MOCK_NFTS)
  }

  // Stake NFT
  const handleStake = (nftId) => {
    setStakedNfts(prev => ({
      ...prev,
      [nftId]: {
        progress: 0,
        startTime: Date.now(),
      }
    }))
  }

  // Unstake NFT
  const handleUnstake = (nftId) => {
    setStakedNfts(prev => {
      const newStaked = { ...prev }
      delete newStaked[nftId]
      return newStaked
    })
  }

  // Claim points
  const handleClaim = (nftId) => {
    const staked = stakedNfts[nftId]
    if (staked && staked.progress >= 100) {
      setClaimedPoints(prev => prev + 1) // 1 W POINT per NFT
      // Reset progress after claim
      setStakedNfts(prev => ({
        ...prev,
        [nftId]: {
          ...prev[nftId],
          progress: 0,
          startTime: Date.now(),
        }
      }))
    }
  }

  // Update progress every second (24 hours = 100%)
  useEffect(() => {
    const interval = setInterval(() => {
      setStakedNfts(prev => {
        const updated = { ...prev }
        Object.keys(updated).forEach(nftId => {
          const elapsed = Date.now() - updated[nftId].startTime
          const hours = elapsed / (1000 * 60 * 60)
          const progress = Math.min(100, (hours / 24) * 100) // 24 hours = 100%
          updated[nftId].progress = progress
        })
        return updated
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const cardRadius = cornerRadius === '999px' ? '24px' : cornerRadius

  // Not connected state
  if (!walletConnected) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        gap: '24px',
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        
        <div style={{ textAlign: 'center', maxWidth: '320px' }}>
          <h3 style={{
            fontSize: '22px',
            fontWeight: 700,
            color: textColor,
            marginBottom: '8px',
            fontFamily: `'${font}', sans-serif`,
          }}>
            Connect Your Wallet
          </h3>
          <p style={{
            fontSize: '15px',
            color: textColor,
            opacity: 0.7,
            lineHeight: 1.5,
            fontFamily: `'${font}', sans-serif`,
          }}>
            Connect your Ethereum wallet to view and stake your NFT collection
          </p>
        </div>

        <button
          onClick={handleConnectWallet}
          style={{
            padding: '14px 32px',
            borderRadius: cornerRadius,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: `'${font}', sans-serif`,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = `scale(${hoverZoom})`
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)'
          }}
        >
          Connect Wallet
        </button>

        {/* Points Display */}
        <div style={{
          marginTop: '20px',
          padding: '12px 24px',
          borderRadius: cornerRadius,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <span style={{
            fontSize: '14px',
            color: textColor,
            opacity: 0.6,
            fontFamily: `'${font}', sans-serif`,
          }}>
            Total Points: 
          </span>
          <span style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#ffd700',
            marginLeft: '8px',
            fontFamily: `'${font}', sans-serif`,
          }}>
            {claimedPoints} W
          </span>
        </div>
      </div>
    )
  }

  // Connected state - show NFTs
  return (
    <div style={{ padding: '0 0 40px' }}>
      {/* Header with points */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        padding: '0 4px',
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          color: textColor,
          fontFamily: `'${font}', sans-serif`,
        }}>
          Your Collection
        </h3>
        
        <div style={{
          padding: '8px 16px',
          borderRadius: cornerRadius,
          background: 'rgba(255,215,0,0.15)',
          border: '1px solid rgba(255,215,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffd700">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
          <span style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#ffd700',
            fontFamily: `'${font}', sans-serif`,
          }}>
            {claimedPoints} W
          </span>
        </div>
      </div>

      {/* NFT Grid - 3 per row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
      }}>
        {nfts.map(nft => {
          const isStaked = stakedNfts[nft.id]
          const progress = isStaked ? stakedNfts[nft.id].progress : 0
          const canClaim = progress >= 100

          return (
            <div
              key={nft.id}
              style={{
                ...cardBgStyle,
                borderRadius: cardRadius,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                if (hoverZoom > 1) {
                  e.currentTarget.style.transform = `scale(${hoverZoom})`
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)'
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* NFT Image */}
              <div style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '100%',
                background: '#1a1a1a',
              }}>
                <img
                  src={nft.image}
                  alt={nft.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                
                {/* Staked Badge */}
                {isStaked && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    padding: '6px 12px',
                    borderRadius: '999px',
                    background: 'rgba(0,255,136,0.9)',
                    backdropFilter: 'blur(10px)',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#000',
                    fontFamily: `'${font}', sans-serif`,
                  }}>
                    STAKED
                  </div>
                )}
              </div>

              {/* NFT Info */}
              <div style={{ padding: '16px' }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: textColor,
                  marginBottom: '4px',
                  fontFamily: `'${font}', sans-serif`,
                }}>
                  {nft.name}
                </h4>
                <p style={{
                  fontSize: '13px',
                  color: textColor,
                  opacity: 0.6,
                  marginBottom: '16px',
                  fontFamily: `'${font}', sans-serif`,
                }}>
                  {nft.collection}
                </p>

                {/* Progress Bar (only show if staked) */}
                {isStaked && (
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                    }}>
                      <span style={{
                        fontSize: '12px',
                        color: textColor,
                        opacity: 0.7,
                        fontFamily: `'${font}', sans-serif`,
                      }}>
                        Progress
                      </span>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: canClaim ? '#00ff88' : textColor,
                        fontFamily: `'${font}', sans-serif`,
                      }}>
                        {progress.toFixed(1)}%
                      </span>
                    </div>
                    
                    {/* Progress bar */}
                    <div style={{
                      width: '100%',
                      height: '6px',
                      borderRadius: '999px',
                      background: 'rgba(255,255,255,0.1)',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: canClaim 
                          ? 'linear-gradient(90deg, #00ff88 0%, #00cc6a 100%)'
                          : 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                        transition: 'width 0.3s ease',
                      }} />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  {!isStaked ? (
                    <button
                      onClick={() => handleStake(nft.id)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: cornerRadius === '999px' ? '999px' : '8px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        color: '#ffffff',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontFamily: `'${font}', sans-serif`,
                        transition: 'opacity 0.2s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      Stake
                    </button>
                  ) : (
                    <>
                      {canClaim && (
                        <button
                          onClick={() => handleClaim(nft.id)}
                          style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: cornerRadius === '999px' ? '999px' : '8px',
                            background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                            border: 'none',
                            color: '#000',
                            fontSize: '14px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontFamily: `'${font}', sans-serif`,
                            transition: 'opacity 0.2s ease',
                          }}
                          onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                          Claim 1 W
                        </button>
                      )}
                      <button
                        onClick={() => handleUnstake(nft.id)}
                        style={{
                          flex: canClaim ? 0 : 1,
                          padding: '10px',
                          paddingLeft: canClaim ? '12px' : '10px',
                          paddingRight: canClaim ? '12px' : '10px',
                          borderRadius: cornerRadius === '999px' ? '999px' : '8px',
                          background: 'rgba(255,59,48,0.15)',
                          border: '1px solid rgba(255,59,48,0.3)',
                          color: '#ff3b30',
                          fontSize: '14px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontFamily: `'${font}', sans-serif`,
                          transition: 'opacity 0.2s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                      >
                        {canClaim ? '✕' : 'Unstake'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty state */}
      {nfts.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: textColor,
          opacity: 0.5,
        }}>
          <p style={{ fontFamily: `'${font}', sans-serif` }}>No NFTs found in your wallet</p>
        </div>
      )}
    </div>
  )
}
