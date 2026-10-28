    function showToast(message, type = 'info') {
      const toast = document.createElement('div');
      toast.className = `px-4 py-2.5 rounded-xl shadow-lg text-xs font-medium text-white transition-all transform duration-300 flex items-center space-x-2 pointer-events-auto ${
        type === 'success' ? 'bg-emerald-600' :
        type === 'warn' ? 'bg-amber-600' :
        type === 'error' ? 'bg-rose-600' : 'bg-slate-800'
      }`;
      toast.innerHTML = `
        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>${message}</span>
      `;
      const container = document.getElementById('toastContainer');
      container.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
      }, 2500);
    }

