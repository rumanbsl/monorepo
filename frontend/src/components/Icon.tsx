/* eslint-disable */
// Presented by https://rumanbsl@github.com - do not modify manually
import React, {DOMAttributes, SVGAttributes, HTMLAttributes} from 'react';

const iconNames = [
  'arrow',
  'facebook',
  'heart',
  'menu',
  'search',
  'wheel',
] as const;

export type IconName = typeof iconNames[number];

interface PropTypes {
  className?: string;
  color?: string;
  height?: number;
  width?: number;
  name: IconName;
  onClick?: DOMAttributes<SVGSVGElement>["onClick"];
  size?: number;
  style?: SVGAttributes<SVGSVGElement>["style"];
  wrapperStyle?:HTMLAttributes<HTMLDivElement>["style"]
};

const getIcon = (props: PropTypes) => {
  const {height, color, onClick, name, size, style, width, className, ...rest} = props;
  if(name === 'arrow') {
    return (<svg {...rest} height={typeof height === "number" ? height : size || 0} width={typeof width === "number" ? width : size || 0} onClick={onClick} style={style} className={className} fill={color} viewBox="0 0 512.002 512.002"><path d="M388.425 241.951L151.609 5.79c-7.759-7.733-20.321-7.72-28.067.04-7.74 7.759-7.72 20.328.04 28.067l222.72 222.105-222.728 222.104c-7.759 7.74-7.779 20.301-.04 28.061a19.8 19.8 0 0014.057 5.835 19.79 19.79 0 0014.017-5.795l236.817-236.155c3.737-3.718 5.834-8.778 5.834-14.05s-2.103-10.326-5.834-14.051z"/></svg>);
  }
  if(name === 'facebook') {
    return (<svg {...rest} height={typeof height === "number" ? height : (512)} width={typeof width === "number" ? width : (512)} onClick={onClick} style={style} className={className} fill={color} viewBox="0 0 24 24"><path d="M15.997 3.985h2.191V.169C17.81.117 16.51 0 14.996 0 8.064 0 9.95 7.85 9.674 9H6.187v4.266h3.486V24h4.274V13.267h3.345l.531-4.266h-3.877c.188-2.824-.761-5.016 2.051-5.016z" /></svg>);
  }
  if(name === 'heart') {
    return (<svg {...rest} height={typeof height === "number" ? height : (23)} width={typeof width === "number" ? width : (22)} onClick={onClick} style={style} className={className} fill={color} viewBox="0 0 23 22"><path d="M16.551 2.809c.548.24 1.059.598 1.497 1.062a5.124 5.124 0 011.04 1.653c.199.509.32 1.05.36 1.604l-5.884 9.002-2.504 3.3L2.553 7.11c.04-.547.162-1.083.36-1.586a5.122 5.122 0 011.04-1.653 4.61 4.61 0 011.496-1.062 4.238 4.238 0 011.705-.36c.579 0 1.158.12 1.705.36a4.54 4.54 0 011.111.697l1.03.873 1.03-.873c.342-.29.717-.524 1.111-.697a4.239 4.239 0 011.705-.36c.58 0 1.158.12 1.705.36zm0 0l.642-1.296m-7.684-.017c.537.236 1.039.55 1.491.934a6.088 6.088 0 011.491-.934A5.857 5.857 0 0114.846 1c.808 0 1.608.169 2.355.496a6.144 6.144 0 011.997 1.413 6.557 6.557 0 011.334 2.114c.309.79.468 1.638.468 2.494l-6.154 9.414L11 22 1 7.517c0-.856.16-1.703.468-2.494.31-.79.763-1.509 1.334-2.114A6.143 6.143 0 014.8 1.496 5.857 5.857 0 017.154 1c.808 0 1.608.169 2.355.496z" stroke="#050505"/></svg>);
  }
  if(name === 'menu') {
    return (<svg {...rest} height={typeof height === "number" ? height : (512)} width={typeof width === "number" ? width : (512)} onClick={onClick} style={style} className={className} fill={color} viewBox="0 0 512 512" id="Layer_1"><path d="M464.883 64.267H47.117C21.137 64.267 0 85.403 0 111.416c0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.013-21.137-47.149-47.117-47.149zM464.883 208.867H47.117C21.137 208.867 0 230.003 0 256.016c0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.013-21.137-47.149-47.117-47.149zM464.883 353.467H47.117C21.137 353.467 0 374.604 0 400.616c0 25.98 21.137 47.117 47.117 47.117h417.766c25.98 0 47.117-21.137 47.117-47.117 0-26.012-21.137-47.149-47.117-47.149z"/></svg>);
  }
  if(name === 'search') {
    return (<svg {...rest} height={typeof height === "number" ? height : (25)} width={typeof width === "number" ? width : (26)} onClick={onClick} style={style} className={className} fill={color} viewBox="0 0 25 26"><path fillRule="evenodd" clipRule="evenodd" d="M17.362 17.07A9.5 9.5 0 1120 10.5a9.46 9.46 0 01-1.983 5.81l-.053-.053-.707.707.105.106zm.708.707A10.47 10.47 0 0110.5 21C4.701 21 0 16.299 0 10.5S4.701 0 10.5 0 21 4.701 21 10.5c0 2.465-.85 4.73-2.27 6.522l7.013 7.014-.707.707-6.966-6.966z" /></svg>);
  }
  if(name === 'wheel') {
    return (<svg id="Capa_1" {...rest} height={typeof height === "number" ? height : (512)} width={typeof width === "number" ? width : (512)} onClick={onClick} style={style} className={className} fill={color} viewBox="0 0 512.05 512.05"><path d="M256 61.025c-107.523 0-195 87.477-195 195s87.477 195 195 195 195-87.477 195-195-87.477-195-195-195zm0 30c80.738 0 148.11 58.293 162.259 135-9.418-1.451-65.148 8.883-107.558-36.311-23.996-25.574-55.61-23.883-54.708-23.69-20.936 0-40.361 8.415-54.693 23.689-21.654 23.076-52.991 36.311-85.974 36.311H93.741C107.89 149.318 175.262 91.025 256 91.025zM103 317.777c58.141-12.238 113.872 36.497 107.643 96.907-48.989-14.025-88.716-50.182-107.643-96.907zm137.198 102.488c10.18-82.487-65.814-149.614-145.886-131.267A165.206 165.206 0 0191 256.025c9.937-1.581 79.411 10.445 132.178-45.783 17.734-18.902 47.773-19.049 65.646.001 52.817 56.282 122.001 44.163 132.177 45.782 0 11.289-1.143 22.315-3.312 32.973-80.235-18.381-156.044 48.954-145.886 131.267a164.664 164.664 0 01-31.605 0zm61.159-5.581c-6.236-60.477 49.571-109.132 107.644-96.908-18.927 46.726-58.655 82.883-107.644 96.908z"/><path d="M301 271.025c0-24.813-20.186-45-45-45s-45 20.187-45 45 20.186 45 45 45 45-20.186 45-45zm-45 15c-8.271 0-15-6.728-15-15 0-8.271 6.729-15 15-15 8.272 0 15 6.729 15 15 0 8.272-6.728 15-15 15z"/><path d="M436.812 75.213C388.327 26.727 324.113.025 256 .025c-140.96 0-256 115.049-256 256 0 140.961 115.049 256 256 256 68.113 0 132.327-26.702 180.812-75.188a254.883 254.883 0 000-361.624zM256 482.025c-124.617 0-226-101.383-226-226s101.383-226 226-226 226 101.383 226 226-101.383 226-226 226z"/></svg>);
  }
  return <div>🤷🏽‍♂️ no icon name given</div>
}

export default(props: PropTypes) => {
  const {wrapperStyle} = props;
  return wrapperStyle ? <div style={wrapperStyle}>{getIcon(props)}</div> : getIcon(props)
}
