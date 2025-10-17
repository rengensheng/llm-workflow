import { Transition as HeadlessTransition } from '@headlessui/react';

interface TransitionProps {
  show?: boolean;
  children: React.ReactNode;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
}

export const Transition: React.FC<TransitionProps> = ({
  show,
  children,
  enter = 'transition ease-out duration-200',
  enterFrom = 'opacity-0',
  enterTo = 'opacity-100',
  leave = 'transition ease-in duration-150',
  leaveFrom = 'opacity-100',
  leaveTo = 'opacity-0',
}) => {
  return (
    <HeadlessTransition
      show={show}
      enter={enter}
      enterFrom={enterFrom}
      enterTo={enterTo}
      leave={leave}
      leaveFrom={leaveFrom}
      leaveTo={leaveTo}
    >
      {children}
    </HeadlessTransition>
  );
};

export const FadeTransition: React.FC<Omit<TransitionProps, 'enter' | 'enterFrom' | 'enterTo' | 'leave' | 'leaveFrom' | 'leaveTo'>> = (props) => (
  <Transition
    enter="transition-opacity duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-300"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
    {...props}
  />
);

export const SlideUpTransition: React.FC<Omit<TransitionProps, 'enter' | 'enterFrom' | 'enterTo' | 'leave' | 'leaveFrom' | 'leaveTo'>> = (props) => (
  <Transition
    enter="transition-all duration-300"
    enterFrom="opacity-0 transform translate-y-4"
    enterTo="opacity-100 transform translate-y-0"
    leave="transition-all duration-300"
    leaveFrom="opacity-100 transform translate-y-0"
    leaveTo="opacity-0 transform translate-y-4"
    {...props}
  />
);

export const ScaleTransition: React.FC<Omit<TransitionProps, 'enter' | 'enterFrom' | 'enterTo' | 'leave' | 'leaveFrom' | 'leaveTo'>> = (props) => (
  <Transition
    enter="transition-all duration-300"
    enterFrom="opacity-0 transform scale-95"
    enterTo="opacity-100 transform scale-100"
    leave="transition-all duration-300"
    leaveFrom="opacity-100 transform scale-100"
    leaveTo="opacity-0 transform scale-95"
    {...props}
  />
);