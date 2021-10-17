import rewire from "rewire"
const logger = rewire("./logger")
const tagsString = logger.__get__("tagsString")
const colorPrintfBuilder = logger.__get__("colorPrintfBuilder")
const monochromePrintfBuilder = logger.__get__("monochromePrintfBuilder")
const winstonFormatter = logger.__get__("winstonFormatter")
// @ponicode
describe("tagsString", () => {
    test("0", () => {
        let callFunction: any = () => {
            tagsString("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            tagsString(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            tagsString(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            tagsString(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            tagsString({ key0: "George" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            tagsString(NaN)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("colorPrintfBuilder", () => {
    test("0", () => {
        let callFunction: any = () => {
            colorPrintfBuilder("C:\\\\path\\to\\folder\\", "%message")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            colorPrintfBuilder("path/to/folder/", "%message%date<?xml version=\"1.0\" ?>\n<a b=\"c\"/>\n")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            colorPrintfBuilder("/path/to/file", "%date%tags%-level")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            colorPrintfBuilder("/path/to/file", "%tags%date%message%message%logger")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            colorPrintfBuilder("path/to/file.ext", "%message%level%tags")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            colorPrintfBuilder(true, Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("monochromePrintfBuilder", () => {
    test("0", () => {
        let callFunction: any = () => {
            monochromePrintfBuilder(".", "%level")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            monochromePrintfBuilder("C:\\\\path\\to\\file.ext", "%message<?xml version=\"1.0\" ?>\n<a b=\"c\"/>\n%tags<?xml version=\"1.0\" ?>\n<a b=\"c\"/>\n%logger")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            monochromePrintfBuilder(true, "%message%date")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            monochromePrintfBuilder(".", "%logger%tags%-level%-level%message%date%tags%logger")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            monochromePrintfBuilder(true, "%logger%date")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            monochromePrintfBuilder(Infinity, "")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("winstonFormatter", () => {
    test("0", () => {
        let callFunction: any = () => {
            winstonFormatter("Anas", "1.0.0")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            winstonFormatter(false, "v1.2.4")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            winstonFormatter("Michael", "^5.0.0")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            winstonFormatter(false, "4.0.0-beta1\t")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            winstonFormatter(-1.0, 12)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            winstonFormatter("", -Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("logger.getLogger", () => {
    test("0", () => {
        let callFunction: any = () => {
            logger.getLogger(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            logger.getLogger(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            logger.getLogger(-5.48)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            logger.getLogger("C:\\\\path\\to\\file.ext")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            logger.getLogger(-100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            logger.getLogger(NaN)
        }
    
        expect(callFunction).not.toThrow()
    })
})
