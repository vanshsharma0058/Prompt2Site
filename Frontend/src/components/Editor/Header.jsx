import { Sparkles, X } from "lucide-react";

const Header = ({ website, onClose }) => {
  return (
   <div className="h-14 flex items-center justify-between px-4 md:px-6
bg-white/5 backdrop-blur-xl border-r border-b border-white/10">

  <div className="flex items-center gap-3 min-w-0">

    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 shrink-0">
      <Sparkles size={16} />
    </div>

    <div className="flex flex-col leading-tight truncate">
      <span className="font-semibold truncate">
        {website?.title}
      </span>

      <span className="text-xs text-zinc-400">
        AI Website Editor
      </span>
    </div>

  </div>

  <button
    onClick={onClose}
    className="md:hidden p-2 hover:bg-white/10 rounded-lg"
  >
    <X size={16} />
  </button>

</div>
  );
};

export default Header;