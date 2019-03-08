const rooms = [
    {
        _id: "03-01",
        type: {
            _id: "R04",
            name: "4-bedded room"
        }
    }, {
        _id: "03-02",
        type: {
            _id: "R04",
            name: "4-bedded room"
        }
    }, {
        _id: "03-03",
        type: {
            _id: "R04",
            name: "4-bedded room"
        }
    }, {
        _id: "03-04",
        type: {
            _id: "R04",
            name: "4-bedded room"
        }
    }, {
        _id: "03-05",
        type: {
            _id: "R04",
            name: "4-bedded room"
        }
    }, {
        _id: "03-06",
        type: {
            _id: "R04",
            name: "4-bedded room"
        }
    }, {
        _id: "03-07",
        type: {
            _id: "R04",
            name: "4-bedded room"
        }
    }, {
        _id: "03-08",
        type: {
            _id: "R04",
            name: "4-bedded room"
        }
    }, {
        _id: "03-09",
        type: {
            _id: "R04",
            name: "4-bedded room"
        }
    }, {
        _id: "03-10",
        type: {
            _id: "R01",
            name: "ensuite"
        }
    }, {
        _id: "04-01",
        type: {
            _id: "R04",
            name: "4-bedded room"
        }
    }, {
        _id: "04-02",
        type: {
            _id: "R02",
            name: "2-bedded room"
        }
    }, {
        _id: "04-03",
        type: {
            _id: "R02",
            name: "2-bedded room"
        }
    }, {
        _id: "04-04",
        type: {
            _id: "R02",
            name: "2-bedded room"
        }
    }, {
        _id: "04-05",
        type: {
            _id: "R02",
            name: "2-bedded room"
        }
    }, {
        _id: "04-06",
        type: {
            _id: "R04",
            name: "4-bedded room"
        }
    }, {
        _id: "04-07",
        type: {
            _id: "R04",
            name: "4-bedded room"
        }
    }, {
        _id: "04-08",
        type: {
            _id: "R04",
            name: "4-bedded room"
        }
    }, {
        _id: "04-09",
        type: {
            _id: "R04",
            name: "4-bedded room"
        }
    }, {
        _id: "04-10",
        type: {
            _id: "R04",
            name: "4-bedded room"
        }
    }
];

export function getRooms() {
    return rooms.map(room => room._id)
}

export function getRoom(id) {
    return rooms.find(room => room._id === id);
}
