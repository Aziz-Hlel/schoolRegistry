import { cn } from '@/lib/utils';

const HeaderContainer: React.FC<React.ComponentProps<'div'>> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        "truncate cursor-pointer flex items-center justify-start space-x-2 whitespace-nowrap w-auto rounded-md text-sm font-medium transition-all [&_svg:not([class*='size-'])]:size-4  ps-2 ",
        props.className,
      )}
    >
      {children}
    </div>
  );
};

export default HeaderContainer;
