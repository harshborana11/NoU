

const ErrorsOnLogin = (err) => {
  if (!err.code) {
    return { error: 404, message: 'This email is not registered, please signup' }
  }
  else { return ({ error: 505 }) }
}

const ErrorsOnCreatingGameSession = (err) => {
  if (err.code == '23505') {
    if (err.constraint === 'one_active_or_waiting_game_per_user') {
      return { error: 404, message: 'alredy one game is running' }
    }
  }
}

export { ErrorsOnCreatingGameSession, ErrorsOnLogin }
