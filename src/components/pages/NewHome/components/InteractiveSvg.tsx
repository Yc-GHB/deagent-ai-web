'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// 模块数据
const moduleData = [
  { id: 1, top: 189, left: 125, size: 40, factor: 0.5, delay: 0.05 },
  { id: 2, top: 240, left: 37, size: 36, factor: 0.8, delay: 0.1 },
  { id: 3, top: 124, left: 219, size: 70, factor: 0.3, delay: 0.15 },
  { id: 4, top: 290, left: 497, size: 50, factor: 0.4, delay: 0.2 },
  { id: 5, top: 341, left: 408, size: 45, factor: 0.7, delay: 0.25 },
  { id: 6, top: 391, left: 320, size: 40, factor: 0.5, delay: 0.3 },
]

const InteractiveSvg = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [, setMouseAbsPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerBounds, setContainerBounds] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [autoAnimate, setAutoAnimate] = useState({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)
  const [activeModule, setActiveModule] = useState<number | null>(null)

  // 更新容器边界
  useEffect(() => {
    if (containerRef.current) {
      const updateBounds = () => {
        const bounds = containerRef.current?.getBoundingClientRect()
        if (bounds) {
          setContainerBounds({
            left: bounds.left,
            top: bounds.top,
            width: bounds.width,
            height: bounds.height,
          })
        }
      }

      updateBounds()
      window.addEventListener('resize', updateBounds)
      window.addEventListener('scroll', updateBounds)
      return () => {
        window.removeEventListener('resize', updateBounds)
        window.removeEventListener('scroll', updateBounds)
      }
    }
    return () => {} // 添加默认的清理函数
  }, [])

  // 自动动画效果
  useEffect(() => {
    const startTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const elapsed = (now - startTime) / 1000 // 转换为秒

      // 使用正弦和余弦函数创建平滑的循环动画
      const x = Math.sin(elapsed * 0.5) * 0.2
      const y = Math.cos(elapsed * 0.3) * 0.2

      setAutoAnimate({ x, y })
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // 处理鼠标移动
  const handleMouseMove = (e: React.MouseEvent) => {
    // 保存鼠标在容器内的绝对位置
    const mouseX = e.clientX - containerBounds.left
    const mouseY = e.clientY - containerBounds.top
    setMouseAbsPosition({ x: mouseX, y: mouseY })

    // 计算鼠标在容器内的相对位置 (0-1)
    const relativeX = mouseX / containerBounds.width
    const relativeY = mouseY / containerBounds.height

    // 将相对位置转换为 -1 到 1 的范围，使得中心点为 0,0
    const normalizedX = (relativeX * 2) - 1
    const normalizedY = (relativeY * 2) - 1

    setMousePosition({ x: normalizedX, y: normalizedY })

    // 检查鼠标是否在任何模块上
    checkModuleHover(mouseX, mouseY)
  }

  // 检查鼠标是否在任何模块上
  const checkModuleHover = (mouseX: number, mouseY: number) => {
    let hoveredModule = null

    for (const item of moduleData) {
      const { id, top, left, size } = item

      // 计算模块的边界
      const moduleLeft = left
      const moduleRight = left + size
      const moduleTop = top
      const moduleBottom = top + size

      // 检查鼠标是否在模块内
      const isOver =
        mouseX >= moduleLeft - 20 &&
        mouseX <= moduleRight + 20 &&
        mouseY >= moduleTop - 20 &&
        mouseY <= moduleBottom + 20

      if (isOver) {
        hoveredModule = id
        break
      }
    }

    setActiveModule(hoveredModule)
  }

  // 计算 SVG 元素的移动
  const calculateTransform = (factor: number = 1) => {
    // 如果鼠标悬停在容器上，使用鼠标位置；否则使用自动动画
    const x = isHovering ? mousePosition.x : autoAnimate.x
    const y = isHovering ? mousePosition.y : autoAnimate.y

    // 根据位置计算位移，factor 控制移动幅度
    const moveX = x * factor * 15
    const moveY = y * factor * 15
    return `translate(${moveX}px, ${moveY}px)`
  }

  // 创建一个可移动元素的组件
  const MovableElement = ({
    top,
    left,
    size,
    color = '#4D4D4D',
    factor = 0.5,
    isCircle = true,
    width,
    height,
    rotate,
    children,
    delay = 0,
    moduleId,
  }: {
    top: number
    left: number
    size?: number
    color?: string
    factor?: number
    isCircle?: boolean
    width?: number
    height?: number
    rotate?: number
    children?: React.ReactNode
    delay?: number
    moduleId?: number
  }) => {
    const isHighlighted = moduleId !== undefined && activeModule === moduleId

    return (
      <div
        className='absolute top-0 left-0 w-full h-full pointer-events-none'
        style={{
          transform: calculateTransform(factor),
          transition: `transform ${isHovering ? '0.3s' : '1.5s'} ease-out ${delay}s`,
        }}
      >
        <div
          className={`absolute ${isCircle ? 'rounded-full' : ''}`}
          style={{
            top: `${top}px`,
            left: `${left}px`,
            width: `${width || size}px`,
            height: `${height || size}px`,
            backgroundColor: isHighlighted ? '#00F2FF' : color,
            opacity: isHighlighted ? 1 : (isHovering ? 0.9 : 0.7),
            transform: rotate ? `rotate(${rotate}deg)` : 'none',
            transition: 'background-color 0.3s ease-out, opacity 0.3s ease-out, box-shadow 0.3s ease-out',
            boxShadow: isHighlighted ? '0 0 20px 8px rgba(0, 242, 255, 0.6)' : 'none',
            zIndex: isHighlighted ? 10 : 1,
          }}
        >
          {children}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className='relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-black'
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setActiveModule(null)
      }}
    >
      <div className='relative w-[581px] h-[393px]'>
        {/* 使用 Image 组件加载 SVG 作为背景 */}
        <Image
          src='/images/home/m.svg'
          alt='Interactive SVG'
          width={581}
          height={393}
          className='absolute top-0 left-0 z-0'
          priority
        />

        {/* 添加可移动的模块，这些模块会随鼠标移动并可以高亮 */}
        {moduleData.map(module => (
          <MovableElement
            key={module.id}
            top={module.top}
            left={module.left}
            size={module.size}
            factor={module.factor}
            delay={module.delay}
            moduleId={module.id}
          />
        ))}

        {/* 连接线 */}
        <MovableElement
          top={160}
          left={100}
          width={100}
          height={2}
          color='#00F2FF'
          factor={0.6}
          isCircle={false}
          rotate={45}
          delay={0.05}
        />

        <MovableElement
          top={300}
          left={400}
          width={80}
          height={2}
          color='#00F2FF'
          factor={0.9}
          isCircle={false}
          rotate={30}
          delay={0.1}
        />

        {/* 添加更多连接线 */}
        <MovableElement
          top={200}
          left={200}
          width={120}
          height={2}
          color='#00F2FF'
          factor={0.4}
          isCircle={false}
          rotate={-15}
          delay={0.15}
        />

        <MovableElement
          top={350}
          left={150}
          width={150}
          height={2}
          color='#00F2FF'
          factor={0.7}
          isCircle={false}
          rotate={10}
          delay={0.2}
        />

        {/* 添加小点装饰 */}
        <MovableElement top={150} left={350} size={8} color='#00F2FF' factor={0.3} delay={0.05} />
        <MovableElement top={280} left={180} size={6} color='#00F2FF' factor={0.5} delay={0.1} />
        <MovableElement top={100} left={450} size={10} color='#00F2FF' factor={0.7} delay={0.15} />
        <MovableElement top={320} left={250} size={7} color='#00F2FF' factor={0.4} delay={0.2} />
        <MovableElement top={220} left={500} size={9} color='#00F2FF' factor={0.6} delay={0.25} />
      </div>
    </div>
  )
}

export default InteractiveSvg
