const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body)  => {
	const notes = loadNotes()
	const duplicateNote = notes.find((note) => note.title === title)

	debugger

	if (!duplicateNote) {
		notes.push({
			title: title,
			body: body
		})
		saveNotes(notes)
		console.log(chalk.bgGreen("New note added!"))	
	}
	else {
		console.log(chalk.bgRed('Note title taken!'))
	}

}

const remNote = (title)  => {
	const notes = loadNotes()
	const notesToKeep = notes.filter((note) => note.title !== title)
	if (notes.length > notesToKeep.length) {
		console.log('Removing title: ' + title)
		console.log(chalk.bgGreen('Note removed!'))
		saveNotes(notesToKeep)
	}
	else {
		console.log(chalk.bgRed('No note found!'))
	}
}

const saveNotes = (notes)  => {
	const dataString = JSON.stringify(notes)
	fs.writeFileSync('notes.json', dataString)
}

const loadNotes = () => {

	try {
		const dataBuffer = fs.readFileSync('notes.json')
		const dataString = dataBuffer.toString()
		return JSON.parse(dataString)
	}
	catch (er) {
		return []
	}
}

const listNotes = () => {
	const notes = loadNotes()
	console.log(chalk.bgCyan('Lisitng the notes!'))
	notes.forEach((note) => {
		console.log(note.title)
	})
}

const readNote = (title) => {
	const notes = loadNotes()
	const note = notes.find((note) => note.title === title)
	if (note) {
		console.log(chalk.bgGreen.italic.underline(note.title))
		console.log(note.body)
	}
	else {
		console.log(chalk.bgRed.bold('No note found :('))
	}
}

module.exports = {
	addNote: addNote,
	remNote: remNote,
	listNotes: listNotes,
	readNote: readNote
}