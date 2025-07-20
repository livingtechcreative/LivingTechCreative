export type AnimationVariant = {
  hidden: {
    [key: string]: any;
  };
  visible: {
    [key: string]: any;
    transition?: {
      duration?: number;
      ease?: any;
      delay?: number;
      [key: string]: any;
    };
  };
};

export interface AnimationVariants {
  container: any;
  sleek: AnimationVariant;
  fast: AnimationVariant;
  trafficLight: AnimationVariant;
  and: AnimationVariant;
  ghostText: AnimationVariant;
  afterMobile: AnimationVariant;
  launch: AnimationVariant;
  launchMobile: AnimationVariant;
  anime: AnimationVariant;
  animeMobile: AnimationVariant;
  subtitle: AnimationVariant;
}
