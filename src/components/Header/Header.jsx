import React from 'react'

const Header = (data) => {
    const FirstSectionData = data?.data?.publicData


    return (
        <div>

            {(FirstSectionData?.journal ||
                FirstSectionData?.volume ||
                FirstSectionData?.pages ||
                FirstSectionData?.publisher) && (<div >
                    {/* Heading */}
                    <div  className="flex items-center">
                        <div  className="flex items-center text-left py-3 text-black font-plus-jakarta-sans font-bold text-lg sm:text-xl md:text-[20px]">
                            Journal Information
                        </div>
                        <hr  className="flex-grow mx-4 border-t-2 border-[#E1E1E1]" />
                    </div>
                    {/* Tabs Content */}
                    <div className="flex flex-wrap flex-col md:flex-row items-start md:items-center gap-10 p-4">

                        {/* <!-- Publisher --> */}
                        {FirstSectionData?.journal && <div className="flex flex-col items-start space-y-1">
                            <span className="text-[#132B38] text-sm font-extrabold mb-2">Journal</span>
                            <div  className="text-[#346896] font-plus-jakarta-sans text-sm font-semibold underline decoration-solid decoration-skip-ink-none leading-normal"                        >
                                {FirstSectionData?.journal}
                            </div>

                        </div>}

                        {/* <!-- Volume --> */}
                        {FirstSectionData?.volume && <div className="flex flex-col items-start space-y-1">
                            <span className="text-[#132B38] text-sm font-extrabold">Volume</span>
                            <div className="bg-[#E5EDF1] inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <path d="M14.4319 11.25C14.4979 11.3646 14.5159 11.5007 14.4818 11.6285C14.4477 11.7562 14.3643 11.8653 14.25 11.9318L8.25 15.4318C8.17355 15.4764 8.08663 15.4999 7.99813 15.4999C7.90962 15.4999 7.8227 15.4764 7.74625 15.4318L1.74625 11.9318C1.63356 11.8641 1.55207 11.7547 1.51944 11.6274C1.4868 11.5 1.50564 11.3649 1.57188 11.2514C1.63811 11.1378 1.74641 11.0549 1.87333 11.0206C2.00025 10.9863 2.13557 11.0033 2.25 11.0681L8 14.4212L13.75 11.0681C13.8646 11.002 14.0007 10.9841 14.1285 11.0182C14.2563 11.0523 14.3654 11.1356 14.4319 11.25ZM13.75 8.06808L8 11.4212L2.25 8.06808C2.13615 8.01139 2.00498 8.00022 1.88319 8.03684C1.7614 8.07345 1.65814 8.15511 1.59442 8.26517C1.53071 8.37524 1.51133 8.50545 1.54023 8.6293C1.56914 8.75315 1.64415 8.86133 1.75 8.93183L7.75 12.4318C7.82645 12.4764 7.91337 12.4999 8.00187 12.4999C8.09038 12.4999 8.1773 12.4764 8.25375 12.4318L14.2537 8.93183C14.3114 8.89922 14.362 8.85549 14.4025 8.80318C14.4431 8.75087 14.4729 8.69102 14.4902 8.6271C14.5075 8.56319 14.5119 8.49647 14.5032 8.43084C14.4945 8.3652 14.4728 8.30195 14.4394 8.24475C14.4061 8.18756 14.3617 8.13755 14.3089 8.09765C14.256 8.05775 14.1958 8.02873 14.1317 8.0123C14.0675 7.99586 14.0007 7.99233 13.9352 8.0019C13.8697 8.01148 13.8068 8.03397 13.75 8.06808ZM1.5 5.49995C1.5002 5.41237 1.5234 5.32639 1.56727 5.2506C1.61115 5.1748 1.67416 5.11186 1.75 5.06808L7.75 1.56808C7.82645 1.52349 7.91337 1.5 8.00187 1.5C8.09038 1.5 8.1773 1.52349 8.25375 1.56808L14.2537 5.06808C14.3292 5.11211 14.3918 5.17516 14.4354 5.25093C14.4789 5.32671 14.5018 5.41257 14.5018 5.49995C14.5018 5.58733 14.4789 5.67319 14.4354 5.74897C14.3918 5.82474 14.3292 5.88779 14.2537 5.93183L8.25375 9.43183C8.1773 9.47641 8.09038 9.4999 8.00187 9.4999C7.91337 9.4999 7.82645 9.47641 7.75 9.43183L1.75 5.93183C1.67416 5.88804 1.61115 5.8251 1.56727 5.74931C1.5234 5.67351 1.5002 5.58753 1.5 5.49995ZM2.9925 5.49995L8 8.4212L13.0075 5.49995L8 2.5787L2.9925 5.49995Z" fill="#346896" />
                                    </svg>
                                </span>
                                <span>
                                    {FirstSectionData?.volume}
                                </span>
                            </div>
                        </div>}

                        {/* <!-- Pages --> */}
                        {FirstSectionData?.pages && <div className="flex flex-col items-start space-y-1">
                            <span className="text-[#132B38] text-sm font-extrabold">Pages</span>
                            <div className="bg-[#E5EDF1] inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <path d="M4.66602 12.4997H9.33268M4.66602 9.83301H5.33268M4.66602 7.16634H6.66602M4.66602 1.83301H10.9993L13.9993 4.83301V13.1663" stroke="#346896" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M2 14.1663V4.83301C2 4.56779 2.10536 4.31344 2.29289 4.1259C2.48043 3.93836 2.73478 3.83301 3 3.83301H9.50133C9.60738 3.8331 9.70906 3.87531 9.784 3.95034L11.8827 6.04901C11.92 6.08627 11.9496 6.13055 11.9697 6.17929C11.9898 6.22803 12.0001 6.28027 12 6.33301V14.1663C12 14.4316 11.8946 14.6859 11.7071 14.8734C11.5196 15.061 11.2652 15.1663 11 15.1663H3C2.73478 15.1663 2.48043 15.061 2.29289 14.8734C2.10536 14.6859 2 14.4316 2 14.1663Z" stroke="#346896" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M9.33398 3.83301V6.09967C9.33398 6.20576 9.37613 6.3075 9.45114 6.38252C9.52616 6.45753 9.6279 6.49967 9.73398 6.49967H12.0007" stroke="#346896" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                                <span>
                                    {FirstSectionData?.pages}
                                </span>
                            </div>
                        </div>}

                        {/* <!-- Journal Publisher --> */}
                        {FirstSectionData?.publisher && <div className="flex flex-col items-start space-y-1">
                            <span className="text-[#132B38] text-sm font-extrabold">Journal Publisher</span>
                            <div className="bg-[#E5EDF1] inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <path d="M10.75 5C10.6275 6.65219 9.37503 8 8.00003 8C6.62503 8 5.37034 6.6525 5.25003 5C5.12503 3.28125 6.34378 2 8.00003 2C9.65628 2 10.875 3.3125 10.75 5Z" stroke="#346896" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M8.00008 10C5.28133 10 2.52195 11.5 2.01133 14.3313C1.94976 14.6725 2.14289 15 2.50008 15H13.5001C13.8576 15 14.0507 14.6725 13.9891 14.3313C13.4782 11.5 10.7188 10 8.00008 10Z" stroke="#346896" stroke-miterlimit="10" />
                                    </svg>
                                </span>
                                <span>
                                    {FirstSectionData?.publisher}
                                </span>
                            </div>
                        </div>}

                    </div>

                    <div className="flex flex-wrap flex-col md:flex-row items-start md:items-center gap-10 p-4">

                        {/* <!-- Impact Factor --> */}
                        {FirstSectionData?.impactFactor && <div className="flex flex-col items-start space-y-1">
                            <span className="text-[#132B38] text-sm font-extrabold">Impact Factor</span>
                            <div className="bg-[#E5EDF1] inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <path d="M13.4993 1.5C13.0664 1.49981 12.6452 1.64013 12.2989 1.89986C11.9526 2.1596 11.7 2.52471 11.579 2.94032C11.458 3.35593 11.4751 3.79959 11.6279 4.20462C11.7806 4.60964 12.0607 4.95414 12.426 5.18634L11.121 9.75406C11.0804 9.75147 11.0399 9.75012 10.9993 9.75C10.5691 9.74953 10.1503 9.88854 9.80574 10.1462L7.39468 8.13697C7.50883 7.7983 7.53014 7.43523 7.4564 7.08553C7.38266 6.73583 7.21656 6.41228 6.97539 6.14854C6.73421 5.88479 6.42677 5.69049 6.08505 5.58585C5.74332 5.4812 5.3798 5.47003 5.0323 5.55351C4.68479 5.63698 4.366 5.81205 4.1091 6.06049C3.85219 6.30894 3.66655 6.62169 3.57148 6.9662C3.47642 7.31071 3.47541 7.67441 3.56855 8.01944C3.6617 8.36448 3.8456 8.67825 4.10112 8.92813L2.68574 11.759C2.62376 11.7531 2.56154 11.7501 2.49927 11.75C2.02014 11.7494 1.55667 11.9206 1.19298 12.2325C0.82929 12.5444 0.589496 12.9764 0.517123 13.4501C0.444749 13.9237 0.544593 14.4076 0.79853 14.8139C1.05247 15.2202 1.44367 15.522 1.90112 15.6645C2.35857 15.807 2.85196 15.7808 3.29172 15.5906C3.73148 15.4003 4.08846 15.0588 4.29787 14.6278C4.50729 14.1969 4.55524 13.7051 4.43305 13.2418C4.31085 12.7785 4.02659 12.3744 3.63187 12.1028L4.96937 9.42816C5.29427 9.51777 5.63657 9.52363 5.96435 9.44518C6.29212 9.36673 6.59468 9.20653 6.8438 8.97953L9.17818 10.9249C9.01966 11.2742 8.96495 11.6618 9.02057 12.0413C9.07619 12.4209 9.2398 12.7765 9.49188 13.0656C9.74397 13.3548 10.0739 13.5653 10.4423 13.6722C10.8108 13.7791 11.2022 13.7777 11.5698 13.6683C11.9375 13.5589 12.266 13.3461 12.5161 13.0552C12.7661 12.7643 12.9273 12.4076 12.9803 12.0276C13.0333 11.6477 12.9759 11.2605 12.8149 10.9123C12.654 10.5641 12.3963 10.2695 12.0726 10.0637L13.3776 5.49594C13.4179 5.49838 13.4584 5.5 13.4993 5.5C14.0297 5.5 14.5384 5.28929 14.9135 4.91421C15.2886 4.53914 15.4993 4.03043 15.4993 3.5C15.4993 2.96957 15.2886 2.46086 14.9135 2.08579C14.5384 1.71071 14.0297 1.5 13.4993 1.5ZM2.49927 14.75C2.30149 14.75 2.10815 14.6914 1.9437 14.5815C1.77925 14.4716 1.65108 14.3154 1.57539 14.1327C1.49971 13.95 1.4799 13.7489 1.51849 13.5549C1.55707 13.3609 1.65231 13.1827 1.79217 13.0429C1.93202 12.903 2.1102 12.8078 2.30418 12.7692C2.49816 12.7306 2.69923 12.7504 2.88196 12.8261C3.06468 12.9018 3.22086 13.03 3.33074 13.1944C3.44062 13.3589 3.49927 13.5522 3.49927 13.75C3.49898 14.0151 3.39352 14.2693 3.20605 14.4568C3.01858 14.6442 2.7644 14.7497 2.49927 14.75ZM5.49927 8.5C5.30149 8.5 5.10815 8.44135 4.9437 8.33147C4.77925 8.22159 4.65108 8.06541 4.57539 7.88268C4.49971 7.69996 4.4799 7.49889 4.51849 7.30491C4.55707 7.11093 4.65231 6.93275 4.79217 6.79289C4.93202 6.65304 5.1102 6.5578 5.30418 6.51921C5.49816 6.48063 5.69923 6.50043 5.88196 6.57612C6.06468 6.65181 6.22086 6.77998 6.33074 6.94443C6.44062 7.10888 6.49927 7.30222 6.49927 7.5C6.49898 7.76513 6.39352 8.01931 6.20605 8.20678C6.01858 8.39425 5.7644 8.4997 5.49927 8.5ZM10.9993 12.75C10.8015 12.75 10.6082 12.6914 10.4437 12.5815C10.2793 12.4716 10.1511 12.3154 10.0754 12.1327C9.99971 11.95 9.9799 11.7489 10.0185 11.5549C10.0571 11.3609 10.1523 11.1827 10.2922 11.0429C10.432 10.903 10.6102 10.8078 10.8042 10.7692C10.9982 10.7306 11.1992 10.7504 11.382 10.8261C11.5647 10.9018 11.7209 11.03 11.8307 11.1944C11.9406 11.3589 11.9993 11.5522 11.9993 11.75C11.999 12.0151 11.8935 12.2693 11.7061 12.4568C11.5186 12.6442 11.2644 12.7497 10.9993 12.75ZM13.4993 4.5C13.3015 4.5 13.1082 4.44135 12.9437 4.33147C12.7793 4.22159 12.6511 4.06541 12.5754 3.88268C12.4997 3.69996 12.4799 3.49889 12.5185 3.30491C12.5571 3.11093 12.6523 2.93275 12.7922 2.79289C12.932 2.65304 13.1102 2.5578 13.3042 2.51921C13.4982 2.48063 13.6992 2.50043 13.882 2.57612C14.0647 2.65181 14.2209 2.77998 14.3307 2.94443C14.4406 3.10888 14.4993 3.30222 14.4993 3.5C14.499 3.76513 14.3935 4.01931 14.2061 4.20678C14.0186 4.39425 13.7644 4.4997 13.4993 4.5Z" fill="#346896" />
                                    </svg>
                                </span>
                                <span>
                                    {FirstSectionData?.impactFactor}
                                </span>
                            </div>
                        </div>}

                        <div></div>

                        {/* <!-- SCImago Ranking --> */}
                        {FirstSectionData?.sciMAGO && <div className="flex flex-col items-start space-y-1">
                            <span className="text-[#132B38] text-sm font-extrabold">SCImago Ranking</span>
                            <div className="bg-[#E5EDF1] inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <path d="M5.66732 6.5H1.33398V14.5H5.66732V6.5Z" stroke="#346896" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M10.0013 2.5H5.66797V14.5H10.0013V2.5Z" stroke="#346896" stroke-linejoin="round" />
                                        <path d="M14.3333 9.16699H10V14.5003H14.3333V9.16699Z" stroke="#346896" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                                <span>
                                    {FirstSectionData?.sciMAGO}
                                </span>
                            </div>
                        </div>}

                        {/* <!-- H-Index --> */}
                        {FirstSectionData?.HIndex && <div className="flex flex-col items-start space-y-1">
                            <span className="text-[#132B38] text-sm font-extrabold">H-Index</span>
                            <div className="bg-[#E5EDF1] inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                        <path d="M5.99935 11.833C5.81046 11.833 5.65224 11.769 5.52468 11.641C5.39713 11.513 5.33313 11.3548 5.33268 11.1663C5.33224 10.9779 5.39624 10.8197 5.52468 10.6917C5.65313 10.5637 5.81135 10.4997 5.99935 10.4997H6.66602C6.8549 10.4997 7.01335 10.5637 7.14135 10.6917C7.26935 10.8197 7.33313 10.9779 7.33268 11.1663C7.33224 11.3548 7.26824 11.5132 7.14068 11.6417C7.01313 11.7701 6.8549 11.8339 6.66602 11.833H5.99935ZM5.33268 15.1663C4.41046 15.1663 3.62446 14.8412 2.97468 14.191C2.3249 13.5408 1.99979 12.7548 1.99935 11.833V5.83301C1.63268 5.83301 1.3189 5.70256 1.05802 5.44167C0.797127 5.18079 0.66646 4.86679 0.666016 4.49967V3.16634C0.666016 2.79967 0.796682 2.4859 1.05802 2.22501C1.31935 1.96412 1.63313 1.83345 1.99935 1.83301H8.66602C9.03268 1.83301 9.34668 1.96367 9.60802 2.22501C9.86935 2.48634 9.99979 2.80012 9.99935 3.16634V4.49967C9.99935 4.86634 9.86891 5.18034 9.60802 5.44167C9.34713 5.70301 9.03313 5.83345 8.66602 5.83301V7.83301C8.66602 8.19967 8.53557 8.51367 8.27468 8.77501C8.01379 9.03634 7.69979 9.16679 7.33268 9.16634H5.99935C5.81046 9.16634 5.65224 9.10234 5.52468 8.97434C5.39713 8.84634 5.33313 8.68812 5.33268 8.49967C5.33224 8.31123 5.39624 8.15301 5.52468 8.02501C5.65313 7.89701 5.81135 7.83301 5.99935 7.83301H7.33268V5.83301H3.33268V11.833C3.33268 12.3886 3.52713 12.8608 3.91602 13.2497C4.3049 13.6386 4.77713 13.833 5.33268 13.833C5.53268 13.833 5.72446 13.8052 5.90802 13.7497C6.09157 13.6941 6.2609 13.6163 6.41602 13.5163C6.56046 13.4275 6.71602 13.4052 6.88268 13.4497C7.04935 13.4941 7.17713 13.5941 7.26602 13.7497C7.36602 13.9052 7.39379 14.0746 7.34935 14.2577C7.3049 14.4408 7.2049 14.5826 7.04935 14.683C6.79379 14.8386 6.52446 14.9581 6.24135 15.0417C5.95824 15.1252 5.65535 15.1668 5.33268 15.1663ZM1.99935 4.49967H8.66602V3.16634H1.99935V4.49967ZM10.9993 13.1663C11.466 13.1663 11.8605 13.0052 12.1827 12.683C12.5049 12.3608 12.666 11.9663 12.666 11.4997C12.666 11.033 12.5049 10.6386 12.1827 10.3163C11.8605 9.99412 11.466 9.83301 10.9993 9.83301C10.5327 9.83301 10.1382 9.99412 9.81602 10.3163C9.49379 10.6386 9.33268 11.033 9.33268 11.4997C9.33268 11.9663 9.49379 12.3608 9.81602 12.683C10.1382 13.0052 10.5327 13.1663 10.9993 13.1663ZM10.9993 14.4997C10.166 14.4997 9.45779 14.2081 8.87468 13.625C8.29157 13.0419 7.99979 12.3335 7.99935 11.4997C7.9989 10.6659 8.29068 9.95767 8.87468 9.37501C9.45868 8.79234 10.1669 8.50056 10.9993 8.49967C11.8318 8.49879 12.5402 8.79056 13.1247 9.37501C13.7091 9.95945 14.0007 10.6677 13.9993 11.4997C13.9993 11.7886 13.9605 12.0663 13.8827 12.333C13.8049 12.5997 13.6882 12.8552 13.5327 13.0997L14.866 14.433C14.9882 14.5552 15.0493 14.7108 15.0493 14.8997C15.0493 15.0886 14.9882 15.2441 14.866 15.3663C14.7438 15.4886 14.5882 15.5497 14.3993 15.5497C14.2105 15.5497 14.0549 15.4886 13.9327 15.3663L12.5993 14.033C12.3549 14.1886 12.0993 14.3052 11.8327 14.383C11.566 14.4608 11.2882 14.4997 10.9993 14.4997Z" fill="#346896" />
                                    </svg>
                                </span>
                                <span>
                                    {FirstSectionData?.HIndex}
                                </span>
                            </div>
                        </div>}

                    </div>


                </div>)}

            {(FirstSectionData?.country?.length > 0 ||
                FirstSectionData?.grantCountry ||
                FirstSectionData?.researchCountry?.length > 0) && (<div  className='mt-4'>
                    {/* Heading */}
                    <div  className="flex items-center">
                        <div  className="flex items-center text-left py-3 text-black font-plus-jakarta-sans font-bold text-lg sm:text-xl md:text-[20px]">
                            Geographic Information
                        </div>
                        <hr  className="flex-grow mx-4 border-t-2 border-[#E1E1E1]" />
                    </div>
                    {/* Tabs Content */}
                    <div className="flex flex-wrap flex-col md:flex-row items-start md:items-center gap-10 p-4">
                        {/* <!-- Author Country --> */}

                        {FirstSectionData?.country?.length > 0 && <div className="flex flex-col items-start space-y-1">
                            <span className="text-[#132B38] text-sm font-extrabold mb-2">Author Country</span>
                            <div  className="bg-[#E5EDF1] inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">
                                {FirstSectionData?.country?.join(', ')}
                            </div>

                        </div>}

                        {/* <!-- Grant Country --> */}
                        {FirstSectionData?.grantCountry && <div className="flex flex-col items-start space-y-1">
                            <span className="text-[#132B38] text-sm font-extrabold mb-2">Grant Country</span>
                            <div className="bg-[#E5EDF1] inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">
                                {FirstSectionData?.grantCountry}
                            </div>
                        </div>}

                        {/* <!-- Research Country --> */}
                        {FirstSectionData?.researchCountry?.length > 0 && <div className="flex flex-col items-start space-y-1">
                            <span className="text-[#132B38] text-sm font-extrabold mb-2">Research Country</span>
                            <div  className="bg-[#E5EDF1] inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">
                                {FirstSectionData?.researchCountry?.join(', ')}
                            </div>
                        </div>}
                    </div>


                </div>)}


        </div>

    )
}

export default Header
