declare module "*.module.css";
declare module "*.png" {
  const value: string;

  export default value;
}

declare module "*.json" {
  const value: any;

  export default value;
}

declare module "*.svg";