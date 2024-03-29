// 24_Schoeman

// Your code goes here
$(() => {
    const url_Users = "users.json";
    const url_Friends = "friends.json";

    const getUserDetails = (url, arr = []) => {
        return new Promise((res, rej) => {
            $.getJSON(url).then(data => {
                if (arr.length < 1) {
                    res(data)
                } else {
                    var userReturnArray = [];
                    var userArray = [];
                    userReturnArray = data.filter(element => {
                        let NouserArray = arr.filter(num => {
                            if (num === element.userid) {
                                userArray.push(element);
                            }
                            return userArray;
                        });
                    })
                    res(userArray);
                }
            });
        });
    };

    const getFriendList = (url, userID) => {
        return new Promise((res, rej) => {
            var returnFriendList = [];
            let id = userID;
            $.getJSON(url).then(data => {
                let actualFriendArrayID = [];
                returnFriendList = data.filter(element => {
                    if (element.user === id) {
                        returnFriendList = element.friends;
                        actualFriendArrayID = element.friends;
                    }
                });
                res(actualFriendArrayID);
            })
        });
    };

    const createUserRow = (user) => {
        const { name, surname } = user;
        let row = $("<tr></tr>", {
                class: "border-top"
            })
            .append($("<td></td>", { html: `${name}` }))
            .append($("<td></td>", { html: `${surname}` }))
        return row;
    }
    var uniPromise;
    let dropDown_Users = getUserDetails(url_Users);
    dropDown_Users.then(users => {
        users.map(user => {
            let element = $(createUserRow(user));
            $(element).attr("data-id", user.userid);
            $(".dropdown-menu").append($(element));
        });
        return users;
    }).then(() => {
        $("div.dropdown-menu tr").on("click", function() {
            $("tbody").empty();

            let id = $(this).data("id");
            getFriendList(url_Friends, id)
                .then((getList) => {
                    return getList;
                })
                .then((getList) => {
                    if (getList.length > 0) {
                        return getUserDetails(url_Users, getList);
                    } else {
                        let row = $("<tr></tr>", {
                                class: "border"
                            })
                            .append($("<td></td>", { html: `No friends` }))
                            .append($("<td></td>", ));
                        $("tbody").append($(row));
                    }
                })
                .then((user) => {
                    let something = user.map(index => {
                        if (index.userid != id) {
                            let newRow = createUserRow(index);
                            $("tbody").append($(newRow));
                        }
                    })
                })
        })
    })
});