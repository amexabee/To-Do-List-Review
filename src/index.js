import Updates from '../modules/updates';
import AddRemove from '../modules/add-remove';
import Lists from '../modules/lists';
import './style.css';

const addRemove = new AddRemove();

const order = (a, b) => a.index - b.index;

const logList = () => {
  const dash = document.getElementById('dashboard');
  dash.innerHTML = '';
  addRemove.items.sort(order).forEach((item) => {
    const lists = document.createElement('li');
    lists.className =
      'list-group-item d-flex justify-content-between align-items-center';

    const child = document.createElement('input');
    child.type = 'checkbox';
    child.name = 'name';
    child.className = 'form-check-input pull-left';
    child.style.marginRight = '12px';
    child.checked = item.isDone;
    child.addEventListener('change', (event) => {
      new Updates().update(event, item);
    });

    const txt = document.createElement('span');
    txt.setAttribute('contenteditable', 'true');
    txt.setAttribute('id', 'dash');
    txt.appendChild(document.createTextNode(item.task));
    txt.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        item.newTask(txt.innerText);
        addRemove.edit(item);
        txt.setAttribute('contenteditable', 'false');
        txt.setAttribute('contenteditable', 'true');
      }
    });

    const close = document.createElement('span');
    close.className = 'fa fa-trash-o pull-right close';
    close.addEventListener('click', (e) => {
      e.preventDefault();
      addRemove.remove(item);
      logList();
    });

    const ellipsis = document.createElement('span');
    ellipsis.className = 'fas fa-ellipsis-v pull-right';
    ellipsis.addEventListener('click', (event) => {
      event.preventDefault();
      ellipsis.style = 'display:none';
      close.style = 'display: block';
    });

    lists.append(child, txt, close, ellipsis);

    dash.appendChild(lists);
  });

  document.getElementById('task').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const item = document.getElementById('task').value;
      event.preventDefault();
      if (item.length > 0) {
        addRemove.add(new Lists(item, false, 0));
        document.getElementById('task').value = '';
        logList();
      }
    }
  });

  document.getElementById('complete').addEventListener('click', (event) => {
    event.preventDefault();
    addRemove.clear();
    logList();
  });
};

logList();
