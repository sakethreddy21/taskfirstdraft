import { BellDot, ChevronsRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { appActions } from '@/app/store/app-slice';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { SunMedium } from 'lucide-react';


type ActiveUserMenuProps = {
  setState: any;
  state: any;
};

function ActiveUserMenu({ setState, state }: ActiveUserMenuProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className=" bg-[#ffffff] dark:border-gray-800 border-gray-400 w-full text-black">
      <div className="flex flex-col justify-center gap-y-2 w-full">
        <div className='flex flex-row gap-x-2 items-center'> <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="loggedinuser"
            sizes='20px'
          />
          <AvatarFallback>saketh</AvatarFallback>
        </Avatar>
          <div className='text-[20px]'>
            sakeh</div>
        </div>
        <div className='flex flex-row gap-x-3 w-full'>
          <BellDot size={16} color='#797979' />
          <SunMedium size={16} />
          <ChevronsRight
            size={16}
            onClick={() => setState(!open)}
            className={` group-hover:text-black ${state ? 'rotate-180' : 'rotate-0'
              }`}
          />
          <button
            onClick={() => {
              dispatch(appActions.logout());
              router.push('/login');
            }}
            className="flex justify-center ml-8 items-center text-[#797979] text-[14px] w-[68px] h-[22px] rounded-md p-2 bg-[#F4F4F4]"
          >Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActiveUserMenu;
