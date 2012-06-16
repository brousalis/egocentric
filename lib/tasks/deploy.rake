require 'net/ssh'

desc "Deploy site to production"
task :deploy => :environment do
  host        = '184.173.85.198'
  user        = 'teamegoc'
  options     = {}
  remote_path = '~/egocentric'

  puts '* Pushing to Github'
  puts `git add .`
  puts `git commit -m "#{ENV['m']}" .`
  puts `git push origin master` 

  puts '* Deploying to production'
  commands = [
    "cd #{remote_path} && git fetch",
    "cd #{remote_path} && git reset --hard origin/master",
    "cd #{remote_path} && bundle install",
    "cd #{remote_path} && bundle exec rake assets:precompile",
    "cd #{remote_path} && touch tmp/restart.txt"
  ]

  Net::SSH.start(host, user, options) do |ssh|
    commands.each { |c| puts ssh.exec!(c) }
    ssh.loop
  end
end
