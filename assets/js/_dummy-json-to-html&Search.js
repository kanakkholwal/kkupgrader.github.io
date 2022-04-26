const items = document.querySelector("#myData");
const searchUser = document.querySelector('#myInput');
let users = []

const fetchImages = () => {
    fetch("./testing.json")
        .then(res => {
            res.json()
                .then(res => {
                    users = res;
                    showUsers(users)
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};

const showUsers = (arr) => {
    let output = "";

    arr.forEach(({ firstName, lastName }) => (output += `
<tr class="hide">
  <td class="py-2 pl-5 border-b border-gray-200 bg-white">
  <div class="flex items-center">
    
    <div class="ml-3">
      <h1 class="capitalize font-semibold text-base text-gray-900 whitespace-no-wrap">
      ${firstName}
      </h1>
    </div>
  </div>
  </td>
  <td class="py-2 text-center border-b border-gray-200 bg-white text-sm">
    <a class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded" 
      href=https://github.com/${lastName}>See profile
    </a>
  </td>
</tr>
`));
    items.innerHTML = output;
}
document.addEventListener("DOMContentLoaded", fetchImages);

searchUser.addEventListener('input', e => {
    const element = e.target.value.toLowerCase()
    const newUser = users
        .filter(user => user.login
            .toLowerCase()
            .includes(element))

    showUsers(newUser)
})