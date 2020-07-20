const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.version('1.1.0')

yargs.command({
	command: 'add',
	describe: 'Adds a new note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		},
		body: {
			describe: 'Note body',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv){
		notes.addNote(argv.title, argv.body)
	}
})

yargs.command({
	command: 'rem',
	describe: 'Removes an existing note',
	builder: {
		title: {
			describe: 'Title of the note to be removed',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv){
		notes.remNote(argv.title)
	}
})

yargs.command({
	command: 'list',
	describe: 'List out all the notes',
	handler(){
		notes.listNotes()

	}
})

yargs.command({
	command: 'read',
	describe: 'Read a specific note',
	builder: {
		title: {
			describe: 'Title of the note to read',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv){
		notes.readNote(argv.title)
	}
})

yargs.parse()