import {
  Dispatch,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

type NonEmptyArray<T> = [T, ...T[]];

type StepProps<Steps extends NonEmptyArray<string>> = PropsWithChildren<{
  name: Steps[number];
}>;

type StepComponent<Steps extends NonEmptyArray<string>> = (
  props: StepProps<Steps>,
) => ReactNode;

type FunnelProps<Steps extends NonEmptyArray<string>> = ReactElement<
  StepProps<Steps>
>;

type FunnelComponent<Steps extends NonEmptyArray<string>> = ({
  children,
}: {
  children: FunnelProps<Steps>[];
}) => ReactNode;

interface Options<Steps extends NonEmptyArray<string>> {
  stepQueryKey?: string | undefined;
  initialStep?: Steps[number] | undefined;
  onStepChange?: ((name: Steps[number]) => void) | undefined;
}

const useFunnel = <Steps extends NonEmptyArray<string>>(
  steps: Steps,
  options?: Options<Steps> | undefined,
): [
  FunnelComponent<Steps>,
  StepComponent<Steps>,
  Dispatch<SetStateAction<Steps[number]>>,
] => {
  const [step, setStep] = useState<Steps[number]>(
    options?.initialStep || steps[0],
  );

  const Step: StepComponent<Steps> = props => {
    return <>{props.children}</>;
  };

  const Funnel: FunnelComponent<Steps> = ({children}) => {
    const targetStep = children.find(
      childStep => childStep && childStep.props.name === step,
    );

    return targetStep;
  };

  return [Funnel, Step, setStep];
};

export default useFunnel;
