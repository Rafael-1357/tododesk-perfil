import logo from "@/assets/nova_logo.svg"
import wrench from "@/assets/wrench-solid.svg"
import minsait from "@/assets/marca_minsait.svg"

function NavMenu() {
  return (
    <div className="flex ">
      <div className="min-h-svh w-20 bg-[#260717] flex flex-col items-center">
        <img src={logo} alt="Logo" className="w-8 my-4" />
        <div className="h-16 w-full flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.5rem" height="1.5rem" viewBox="0 0 12 12">
            <path fill="#fff" d="M6 1a2 2 0 1 0 0 4a2 2 0 0 0 0-4m2.5 5h-5A1.5 1.5 0 0 0 2 7.5c0 1.116.459 2.01 1.212 2.615C3.953 10.71 4.947 11 6 11s2.047-.29 2.788-.885C9.54 9.51 10 8.616 10 7.5A1.5 1.5 0 0 0 8.5 6" />
          </svg>
        </div>
        <div className="h-16 w-full flex justify-center items-center">
          <img src={wrench} alt="Wrench Icon" className="w-8 h-8 fill-white text-white p-1" />
        </div>
        <div className="h-16 w-full flex justify-center items-center ">
          <svg data-v-bd832875="" data-v-33bbd427="" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="icon text-grisCeramica item-icon" width="1.5rem" height="1.5rem" viewBox="0 0 16 16"><path fill="#fff" d="M3 6.026C3 3.25 5.239 1 8 1s5 2.25 5 5.026v3.59c0 .792-.64 1.435-1.429 1.435h-1.428a.716.716 0 0 1-.714-.718V7.462c0-.397.32-.718.714-.718h1.786v-.718c0-2.181-1.76-3.95-3.929-3.95c-2.17 0-3.929 1.769-3.929 3.95v.718h1.786c.395 0 .714.321.714.718v2.871c0 .397-.32.718-.714.718H4.43q-.186 0-.358-.045v.225c0 .855.661 1.555 1.498 1.611l.11.004h.805A1.61 1.61 0 0 1 8 11.77a1.61 1.61 0 0 1 1.607 1.616C9.607 14.277 8.887 15 8 15c-.7 0-1.295-.45-1.516-1.077H5.68a2.685 2.685 0 0 1-2.675-2.55L3 11.232z"></path></svg>
        </div>
        <div className="h-16 w-full flex justify-center items-center bg-[#480e2a] rounded-l-4xl">
          <svg fill="#ff0054" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1.5rem" height="1.5rem"><path d="M406.5 399.6C387.4 352.9 341.5 320 288 320l-64 0c-53.5 0-99.4 32.9-118.5 79.6-35.6-37.3-57.5-87.9-57.5-143.6 0-114.9 93.1-208 208-208s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3l64 0c38.8 0 71.2 27.6 78.5 64.3zM256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" /></svg>
        </div>
      </div>
      <div className="bg-[#480e2a] h-full w-[20rem] p-5 flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-xl">Perfil</h1>
            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="1.5rem" height="1.5rem"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" /></svg>
          </div>
          <div className="py-3 layout-item px-4 cursor-pointer bg-[#ff0054] rounded flex items-center gap-4">
            <p className="text-white">Meu perfil</p>
          </div>
          <div className="py-3 layout-item px-4 cursor-pointer rounded flex items-center gap-4">
            <p className="text-white">Buscar perfil</p>
          </div>
        </div>
        <div>
          <div className="w-full h-px bg-[#4d4d4d]" />
          <p className="text-white">Powered by</p>
          <img src={minsait} />
        </div>
      </div>
    </div>
  )
}

export default NavMenu