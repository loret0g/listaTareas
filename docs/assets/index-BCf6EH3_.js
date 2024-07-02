(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();const S=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="Añade una tarea" autofocus>\r
    </header>\r
    \r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <ul class="todo-list">\r
        </ul>\r
    </section>\r
\r
    <footer class="footer">\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <ul class="filters">\r
            <li>\r
                <!-- La clase selected es la que cambio (con JS) dependiendo del elemento seleccionado -->\r
                <a class="filtro" class="selected" href="#">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#">Completados</a>\r
            </li>\r
        </ul>\r
    \r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>`;var r=[];for(var L=0;L<256;++L)r.push((L+256).toString(16).slice(1));function v(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}var y,E=new Uint8Array(16);function C(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(E)}var A=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);const w={randomUUID:A};function P(e,t,a){if(w.randomUUID&&!t&&!e)return w.randomUUID();e=e||{};var l=e.random||(e.rng||C)();return l[6]=l[6]&15|64,l[8]=l[8]&63|128,v(l)}class I{constructor(t){this.id=P(),this.description=t,this.done=!1,this.createdAt=new Date}}const c={All:"all",Completed:"Completed",Pending:"Pending"},d={todos:[],filter:c.All},U=()=>{b()},b=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=c.All}=JSON.parse(localStorage.getItem("state"));d.todos=e,d.filter=t},f=()=>{localStorage.setItem("state",JSON.stringify(d))},q=(e=c.All)=>{switch(e){case c.All:return[...d.todos];case c.Completed:return d.todos.filter(t=>t.done);case c.Pending:return d.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid`)}},D=e=>{if(!e)throw new Error("Description is required");d.todos.push(new I(e)),f()},O=e=>{d.todos=d.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),f()},F=e=>{d.todos=d.todos.filter(t=>t.id!==e),f()},x=()=>{d.todos=d.todos.filter(e=>!e.done),f()},N=(e=c.All)=>{d.filter=e,f()},k=()=>d.filter,i={addTodo:D,deleteCompleted:x,deleteTodo:F,getCurrentFilter:k,getTodos:q,initStore:U,loadStore:b,setFilter:N,toggleTodo:O},H=e=>{if(!e)throw new Error("A TODO object is required");const{done:t,description:a,id:l}=e,o=`
        <div class="view">
            <input class="toggle" type="checkbox" ${t?"checked":""}>
            <label>${a}</label>
            <button class="destroy"></button>
        </div>
    `,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",l),e.done&&n.classList.add("completed"),n};let g;const M=(e,t=[])=>{if(g||(g=document.querySelector(e)),!g)throw new Error(`Element ${e} not found`);g.innerHTML="",t.forEach(a=>{g.append(H(a))})};let T;const $=e=>{if(T||(T=document.querySelector(e)),!T)throw new Error(`Element ${e} not found`);T.innerHTML=i.getTodos(c.Pending).length},m={CrearCompleted:".clear-completed",TodoList:".todo-list",NewTodoInput:"#new-todo-input",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},R=e=>{const t=()=>{const s=i.getTodos(i.getCurrentFilter());M(m.TodoList,s),a()},a=()=>{$(m.PendingCountLabel)};(()=>{const s=document.createElement("div");s.innerHTML=S,document.querySelector(e).append(s),t()})();const l=document.querySelector(m.NewTodoInput),o=document.querySelector(m.TodoList),n=document.querySelector(m.CrearCompleted),u=document.querySelectorAll(m.TodoFilters);l.addEventListener("keyup",s=>{s.keyCode===13&&s.target.value.trim().length!==0&&(i.addTodo(s.target.value),t(),s.target.value="")}),o.addEventListener("click",s=>{const p=s.target.closest("[data-id]");i.toggleTodo(p.getAttribute("data-id")),t()}),o.addEventListener("click",s=>{const p=s.target.className==="destroy",h=s.target.closest("[data-id]");!h||!p||(i.deleteTodo(h.getAttribute("data-id")),t())}),n.addEventListener("click",()=>{i.deleteCompleted(),t()}),u.forEach(s=>{s.addEventListener("click",p=>{switch(u.forEach(h=>h.classList.remove("selected")),p.target.classList.add("selected"),p.target.text){case"Todos":i.setFilter(c.All);break;case"Pendientes":i.setFilter(c.Pending);break;case"Completados":i.setFilter(c.Completed);break}t()})})};i.initStore();R("#app");
