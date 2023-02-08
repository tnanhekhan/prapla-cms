const studentRepository = require('../data/student-repository');
const listRepository = require("../data/list-repository");

exports.getDetailCreateView = (req, res, next) => {
    listRepository.getLists()
        .then((wordlistsResponse) => {
            let allWordLists = wordlistsResponse.map(object => {
                return {category: object.category, id: object["$id"]}
            });
            res.render('cms/students/detail/index', {
                title: 'Create a new student',
                editable: false,
                allWordLists: allWordLists
            });
        });
}