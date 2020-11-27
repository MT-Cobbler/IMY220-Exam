// 24 Schoeman

// Your code goes here
$(() => {
    const url_Users = "users.json";
    const url_Friends = "friends.json";

    const getUserDetails = (url, arr = []) => {
        return new Promise((res, rej) => {
            $.getJSON(url).done(data => {
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
            $.getJSON(url).done(data => {
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
                class: "border"
            })
            .append($("<td></td>", { html: `${name}` }))
            .append($("<td></td>", { html: `${surname}` }))
        return row;
    }

    let dropDown_Users = getUserDetails(url_Users);
    dropDown_Users.then(users => {
        users.map(user => {
            let element = $(createUserRow(user));
            $(element).attr("data-id", user.userid);
            $(".dropdown-menu").append($(element));
        });
        return users;
    }).then(users => {
        $("div.dropdown-menu tr").on("click", function() {
            $("tbody").empty();
            let id = $(this).data("id");
            let getList = getFriendList(url_Friends, id);
            getList.then(data => {
                return data;
            }).then(getDetails => {
                if (getDetails.length > 0) {
                    let userDetails = getUserDetails(url_Users, getDetails);
                    userDetails.then(user => {
                        user.map(index => {
                            if (index.userid != id) {
                                let newRow = createUserRow(index);
                                $("tbody").append($(newRow));
                            }
                        })
                    })
                } else {
                    let row = $("<tr></tr>", {
                            class: "border"
                        })
                        .append($("<td></td>", { html: `No friends` }))
                        .append($("<td></td>", ));
                    $("tbody").append($(row));
                }
            })
        });
    })
});