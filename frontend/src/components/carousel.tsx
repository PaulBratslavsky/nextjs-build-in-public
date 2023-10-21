import "./carousel.css"

const Carousel = () => {
  const TIME = {
    slow: "animate 10s linear infinite",
    medium: 'animate 15s linear infinite',
    normal: 'animate 20s linear infinite',
    fast: 'animate 25s linear infinite',
    super: 'animate 35s linear infinite'
  }
const animation = {
  animation: `${TIME.normal} `
}
const animation2 = {
  animation: `${TIME.fast} `
}

  return (
    <div className="scroll h-screen space-y-8">
      <div style={animation}>
        <span>HTML</span>
        <span>CSS</span>
        <span>Javascript</span>
        <span>ReactJS</span>
        <span>Strapi</span>
      </div>
      <div style={animation2}>
        <span>HTML</span>
        <span>CSS</span>
        <span>Javascript</span>
        <span>ReactJS</span>
        <span>Strapi</span>
      </div>      
    </div>
  )
}

export default Carousel