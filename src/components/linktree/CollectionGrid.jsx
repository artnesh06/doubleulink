import { useState, useEffect } from 'react'

const CONTRACT = '0x3b9b467ef39310cac0318fd766b805d2cb2143d0'
const TOKEN_IDS = [1, 42, 7, 69, 13, 88]

// Fetch NFT image from OpenSea metadata
async function fetchNFTImage(tokenId) {
  try {
    // Try OpenSea API v2 (no key needed for basic metadata)
    const res = await fetch(`https://api.opensea.io/api/v2/chain/ethereum/contract/${CONTRACT}/nfts/${tokenId}`, {
      headers: { 'accept': 'application/json' }
    })
    if (res.ok) {
      const data = await res.json()
      return {
        id: tokenId,
        name: data.nft?.name || `Punkers #${tokenId}`,
        image: data.nft?.image_url || data.nft?.display_image_url || null,
        collection: 'Punkers NFT',
        tokenId: String(tokenId),
        opensea: `https://opensea.io/assets/ethereum/${CONTRACT}/${tokenId}`,
      }
    }
  } catch {}
  // Fallback — use the known image URL pattern
  return {
    id: tokenId,
    name: `Punkers #${String(tokenId).padStart(3, '0')}`,
    image: `https://i2c.seadn.io/ethereum/${CONTRACT}/2dfc51cd698cb169a8e08d9cb38f80/f92dfc51cd698cb169a8e08d9cb38f80.png?w=500`,
    collection: 'Punkers NFT',
    tokenId: String(tokenId),
    opensea: `https://opensea.io/assets/ethereum/${CONTRACT}/${tokenId}`,
  }
}

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
  const [loadingNfts, setLoadingNfts] = useState(false)
  const [stakedNfts, setStakedNfts] = useState({})
  const [claimedPoints, setClaimedPoints] = useState(0)

  // Connect wallet and fetch NFTs
  const handleConnectWallet = async () => {
    setWalletConnected(true)
    setLoadingNfts(true)
    try {
      const results = await Promise.all(TOKEN_IDS.map(id => fetchNFTImage(id)))
      setNfts(results.filter(n => n !== null))
    } catch {
      setNfts([])
    }
    setLoadingNfts(false)
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
        <h3 style={{ fontSize: '20px', fontWeight: 700, color: textColor, fontFamily: `'${font}', sans-serif` }}>
          Your Collection
        </h3>
        <div style={{ padding: '8px 16px', borderRadius: cornerRadius, background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.3)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffd700"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffd700', fontFamily: `'${font}', sans-serif` }}>{claimedPoints} W</span>
        </div>
      </div>

      {/* Loading */}
      {loadingNfts && (
        <div style={{ textAlign: 'center', padding: '40px', color: textColor, opacity: 0.5 }}>
          <div style={{ fontSize: '14px', fontFamily: `'${font}', sans-serif` }}>Loading NFTs...</div>
        </div>
      )}

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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: textColor, fontFamily: `'${font}', sans-serif`, margin: 0 }}>
                    {nft.name}
                  </h4>
                  <a href={nft.opensea} target="_blank" rel="noopener noreferrer" style={{ color: textColor, opacity: 0.4, flexShrink: 0, marginLeft: '6px' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '0.4'}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </div>
                <p style={{ fontSize: '12px', color: textColor, opacity: 0.5, marginBottom: '12px', fontFamily: `'${font}', sans-serif` }}>
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
