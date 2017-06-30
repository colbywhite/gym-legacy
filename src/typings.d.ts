/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

// TODO this shouldn't really be needed to require 'weight-program-schema'
declare module '*.json' {
    const value: any;
    export default value;
}
