import Loading from '~/components/states/Loading';

export default function LoadingDisplay() {
    return (
        <div className=" absolute  bottom-7 flex w-full items-center justify-center text-center ">
            <div className="flex flex-col items-center justify-center rounded-full bg-[#105a37] p-5 ">
                <Loading />
            </div>
        </div>
    );
}
