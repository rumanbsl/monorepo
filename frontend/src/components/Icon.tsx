/* eslint-disable */
// Presented by https://rumanbsl@github.com - do not modify manually
import React, {DOMAttributes, SVGAttributes, HTMLAttributes} from 'react';

const iconNames = [
  'arrow',
  'facebook',
  'heart',
  'search',
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
    return (<svg {...rest} height={typeof height === "number" ? height : (23)} width={typeof width === "number" ? width : (22)} onClick={onClick} style={style} className={className} fill={color} viewBox="0 0 0 23 22"><path d="M16.551 2.809c.548.24 1.059.598 1.497 1.062a5.124 5.124 0 011.04 1.653c.199.509.32 1.05.36 1.604l-5.884 9.002-2.504 3.3L2.553 7.11c.04-.547.162-1.083.36-1.586a5.122 5.122 0 011.04-1.653 4.61 4.61 0 011.496-1.062 4.238 4.238 0 011.705-.36c.579 0 1.158.12 1.705.36a4.54 4.54 0 011.111.697l1.03.873 1.03-.873c.342-.29.717-.524 1.111-.697a4.239 4.239 0 011.705-.36c.58 0 1.158.12 1.705.36zm0 0l.642-1.296m-7.684-.017c.537.236 1.039.55 1.491.934a6.088 6.088 0 011.491-.934A5.857 5.857 0 0114.846 1c.808 0 1.608.169 2.355.496a6.144 6.144 0 011.997 1.413 6.557 6.557 0 011.334 2.114c.309.79.468 1.638.468 2.494l-6.154 9.414L11 22 1 7.517c0-.856.16-1.703.468-2.494.31-.79.763-1.509 1.334-2.114A6.143 6.143 0 014.8 1.496 5.857 5.857 0 017.154 1c.808 0 1.608.169 2.355.496z" stroke="#050505"/></svg>);
  }
  if(name === 'search') {
    return (<svg {...rest} height={typeof height === "number" ? height : (25)} width={typeof width === "number" ? width : (26)} onClick={onClick} style={style} className={className} fill={color} viewBox="0 0 0 25 26"><path fillRule="evenodd" clipRule="evenodd" d="M17.362 17.07A9.5 9.5 0 1120 10.5a9.46 9.46 0 01-1.983 5.81l-.053-.053-.707.707.105.106zm.708.707A10.47 10.47 0 0110.5 21C4.701 21 0 16.299 0 10.5S4.701 0 10.5 0 21 4.701 21 10.5c0 2.465-.85 4.73-2.27 6.522l7.013 7.014-.707.707-6.966-6.966z" /></svg>);
  }
  return <div>🤷🏽‍♂️ no icon name given</div>
}

export default(props: PropTypes) => {
  const {wrapperStyle} = props;
  return wrapperStyle ? <div style={wrapperStyle}>{getIcon(props)}</div> : getIcon(props)
}
