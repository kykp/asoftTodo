export type PopupProps = {
  trigger: boolean;
  className?: string;
  children?: any;
  anchorPoint: {
    x: number;
    y: number;
  };
  id: string;
  title: string;
  project: string;
  archive: boolean;
  deleted: boolean;
  order: number;
  onHandlePopup: () => void;
};
