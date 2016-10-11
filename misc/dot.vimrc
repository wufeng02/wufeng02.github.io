if exists("g:loaded_vimrc")
    finish
endif
let g:loaded_vimrc = 1

if has("autocmd")
    filetype on
    filetype plugin on
    filetype plugin indent on
endif

if has("syntax") 
    syntax on
    syntax enable
    colorscheme desert
    set background=dark
endif

if has("cmdline_info")
    set ruler
    set showcmd
endif

if has("mouse")
    set mouse=invc
endif

set autochdir
set nrformats-=octal

set title
set showmode
set visualbell
set noerrorbells
set shortmess=atI

set cursorline
set laststatus=2

set wildmenu
set wildmode=list:longest

set smartcase
set ignorecase
set encoding=utf-8

if has("extra_search")
    "set hlsearch
    set incsearch
endif

set magic
set hidden
set gdefault

set esckeys
set modeline
set nocompatible

set backspace=indent,eol,start
set viminfo='20,\"50
set undolevels=4000

if &history < 1000
    set history=1000
endif
if &tabpagemax < 50
    set tabpagemax=50
endif
if !empty(&viminfo)
    set viminfo^=!
endif
"set so=7

set autoindent
set smartindent
set complete-=i

set linebreak
set textwidth=0

set nowb
set nobackup
set noswapfile
set nostartofline
set winminheight=0

set showmatch
set autowrite
set autoread
set fileformats+=mac

set smarttab
set expandtab
set tabstop=4
set shiftwidth=4
set fileformat=unix
set grepprg=grep\ -nH\ $*
set whichwrap=b,s,<,>,[,]

if exists('&foldenable')
    set foldenable
    set foldlevel=20
    set foldcolumn=0
    set foldmethod=syntax
    nnoremap <silent> <Space> @=(foldlevel('.')?'za':'l')<CR>
endif

set number
set numberwidth=1
set completeopt=menuone,menu,longest,preview

if !&scrolloff
    set scrolloff=1
endif
if !&sidescrolloff
    set sidescrolloff=5
endif
set display+=lastline

if &listchars ==# 'eol:$'
    set listchars=tab:>\ ,trail:-,extends:>,precedes:<,nbsp:+
endif

if &t_Co == 8 && $TERM !~# '^linux'
    set t_Co=16
endif

let mapleader=","

set ttimeout
set ttimeoutlen=100

"set pastetoggle=<F3>

"Key map in normal mode
nnoremap ; :
nnoremap <Up> gk
nnoremap <Down> gj

nnoremap <silent> <Tab> :bnext<CR>
nnoremap <silent> <S-Tab> :bprevious<CR>

nnoremap <silent> <leader>sh :shell<CR>
nnoremap <silent> <leader>li :set list!<CR>:set list?<CR>
nnoremap <silent> <leader>nu :set number!<CR>:set nu?<CR>
nnoremap <silent> <leader>pa :set paste!<CR>:set paste?<CR>a
nnoremap <silent> <leader>hl :set hlsearch!<CR>:set hls?<CR>

if has("spell")
    set spelllang=en_us
    nnoremap <silent> <leader>sp :set spell!<CR>:set spell?<CR>
endif

"Key map in visual mode
vnoremap > >gv
vnoremap < <gv
vnoremap <BS> "_d

"Key map in insert mode
"inoremap [ []<LEFT>
"inoremap ( ()<LEFT>
"inoremap { {}<LEFT>

if has("clipboard")
    "Use the system clipboard for copy and paste
    "set clipboard=unnamedplus
endif

"Ctrl-c to copy
vnoremap <C-c> y<ESC>i
"Ctrl-x to cut
vnoremap <C-x> d<ESC>i
"Ctrl-v to paste
inoremap <C-v> <ESC>pi

command! -nargs=0 Format :exe "normal gg=G:wall"
command! -nargs=0 CountWords  :exe "normal g\<c-g>"
command! -complete=file -nargs=1 PrintPs  :hardcopy > <args>
command! -nargs=+ Calc :!python -c "from math import *; print <args>"

if has("mksession")
    command! -nargs=0 SessionSave :mksession! .session
endif

if has('mouse')
    command! -nargs=0 MouseToggle :let &mouse=(&mouse==""? "a" : "")
    nnoremap <slient> <leader>m :MouseToggle<CR>:set mouse?<CR>
endif

if has("autocmd")
    "Restore Last Edit Position
    autocmd BufReadPost * 
        \ if line("'\"") > 0 | if line("'\"") <= line("$") 
        \ | exec("norm'\"") | else | exec "norm $" | endif | endif

    autocmd VimEnter * if argc() == 0 && filereadable(".session") 
        \ | source .session | endif
endif

" Load matchit.vim, but only if the user hasn't installed a newer version.
if !exists('g:loaded_matchit')&&findfile('plugin/matchit.vim', &rtp) ==# ''
    runtime! macros/matchit.vim
endif

hi CursorLine ctermbg=236 cterm=none

"Source local configureation files
for file in split(glob('~/.vim/settings/*.vim'), '\n')
    exe 'source' file
endfor
