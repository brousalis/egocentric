require 'net/ssh'

desc "Deploy site to production"
task :deploy => :environment do
  host        = 'teamegocentric.com'
  user        = 'teamegoc'
  options     = {:keys => '~/.ssh/id_rsa.pub'}
  remote_path = '~/egocentric'

  commands = [
    "cd #{remote_path} && sudo git fetch",
    "cd #{remote_path} && sudo git reset --hard origin/master",
    "cd #{remote_path} && sudo bundle install",
    "cd #{remote_path} && sudo touch tmp/restart.txt"
  ]

  Net::SSH.start(host, user, options) do |ssh|
    commands.each { |c| puts ssh.exec!(c) }
    ssh.loop
  end
end
