export interface BaseComponentProps {
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface VariantProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link' | 'success' | 'warning' | 'error';
}

export interface SizeProps {
  size?: 'sm' | 'md' | 'lg';
}

export interface StateProps {
  loading?: boolean;
  disabled?: boolean;
}

export type ComponentProps = BaseComponentProps & VariantProps & SizeProps & StateProps;