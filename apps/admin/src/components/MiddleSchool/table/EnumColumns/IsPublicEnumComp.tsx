import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Check, X } from 'lucide-react';

export default function IsPublicEnumComp({ isPublic }: { isPublic: boolean }) {
  if (isPublic)
    return (
      <>
        <Tooltip>
          <TooltipTrigger>
            <Check className="h-4 w-4 text-green-500" />
          </TooltipTrigger>
          <TooltipContent>
            <p>مدرسة حكومية</p>
          </TooltipContent>
        </Tooltip>
      </>
    );

  if (!isPublic)
    return (
      <>
        <Tooltip>
          <TooltipTrigger>
            <X className="h-4 w-4 text-red-500" />
          </TooltipTrigger>
          <TooltipContent>
            <p>مدرسة خاصة</p>
          </TooltipContent>
        </Tooltip>
      </>
    );
}
